package ro.msg.event_management.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ro.msg.event_management.controller.dto.CheckDiscountDto;
import ro.msg.event_management.entity.*;
import ro.msg.event_management.exception.OverlappingDiscountsException;
import ro.msg.event_management.repository.DiscountRepository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DiscountService {

    private final DiscountRepository discountRepository;

    @Transactional
    public List<Discount> saveDiscounts  (List<Discount> discounts, TicketCategory ticketCategory) {
        List<Discount> savedDiscounts = new ArrayList<>();
        for (Discount discount : discounts) {
            discount.setTicketCategory(ticketCategory);
            if(!checkOverlappingDiscounts(discount.getStartDate(), discount.getEndDate(), discount.getTicketCategory().getId(), discount.getCode())) {
                throw new OverlappingDiscountsException("Discount overlaps with another one in the same ticket category");
            }
            savedDiscounts.add(this.discountRepository.save(discount));
        }
        return savedDiscounts;
    }

    public void deleteDiscount(long id) {
        Optional<Discount> discountOptional = this.discountRepository.findById(id);
        if (discountOptional.isEmpty()) {
            throw new NoSuchElementException("No discount with id= " + id);
        }
        Discount discount = discountOptional.get();
        TicketCategory ticketCategory = discount.getTicketCategory();
        ticketCategory.getDiscounts().remove(discount);
        this.discountRepository.deleteById(id);
    }

    @Transactional
    public Discount updateDiscount(Discount newDiscount) {
        Optional<Discount> discountOptional = this.discountRepository.findById(newDiscount.getId());
        if (discountOptional.isEmpty()) {
            throw new NoSuchElementException("No discount with id= " + newDiscount.getId());
        }

        Discount discount = discountOptional.get();

        discount.setCode(newDiscount.getCode());
        discount.setPercentage(newDiscount.getPercentage());
        discount.setStartDate(newDiscount.getStartDate());
        discount.setEndDate(newDiscount.getEndDate());

        if(!checkOverlappingDiscounts(discount.getStartDate(), discount.getEndDate(), discount.getTicketCategory().getId(), discount.getCode())) {
            throw new OverlappingDiscountsException("Discount overlaps with another one in the same ticket category");
        }
        return this.discountRepository.save(discount);
    }

    public boolean checkOverlappingDiscounts(LocalDate startDate, LocalDate endDate, long ticketCategory, String code) {
        List<Discount> overlappingEvents = discountRepository.findOverlappingDiscounts(startDate, endDate, ticketCategory, code);
        return overlappingEvents.isEmpty();
    }

    public CheckDiscountDto checkDiscount(CheckDiscountDto checkDiscountDto) {
        List<Long> ticketCategories = checkDiscountDto.getTicketCategories();
        CheckDiscountDto response = CheckDiscountDto.builder().code(checkDiscountDto.getCode()).build();
        List<Long> validCategories = new ArrayList<>();
        for(Long ticketCategory : ticketCategories) {
            List<Discount> discounts = discountRepository.findByCodeAndTicketCategoryId(checkDiscountDto.getCode(),ticketCategory);
            for(Discount discount: discounts) {
                LocalDate currentDate = LocalDate.now();
                LocalDate startDate = discount.getStartDate();
                LocalDate endDate = discount.getEndDate();
                if(!currentDate.isAfter(endDate) && !currentDate.isBefore(startDate)) {
                    validCategories.add(ticketCategory);
                }
            }
        }
        response.setTicketCategories(validCategories);
        return response;
    }
}
