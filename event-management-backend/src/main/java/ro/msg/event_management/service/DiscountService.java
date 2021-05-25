package ro.msg.event_management.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ro.msg.event_management.entity.*;
import ro.msg.event_management.repository.DiscountRepository;

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

        return this.discountRepository.save(discount);
    }
}
