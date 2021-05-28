package ro.msg.event_management.controller.converter;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import ro.msg.event_management.controller.dto.TicketCategoryDto;
import ro.msg.event_management.entity.TicketCategory;

@Component
@AllArgsConstructor
public class TicketCategoryConverter implements Converter<TicketCategoryDto, TicketCategory> {

    private final DiscountConverter discountConverter;

    @Override
    public TicketCategory convert(TicketCategoryDto obj) {
        return TicketCategory.builder()
                .description(obj.getDescription())
                .price(obj.getPrice())
                .subtitle(obj.getSubtitle())
                .ticketsPerCategory(obj.getTicketsPerCategory())
                .title(obj.getTitle())
                .available(obj.isAvailable())
                .build();
    }

    public TicketCategory convertWithId(TicketCategoryDto obj){
        TicketCategory ticketCategory = TicketCategory
                .builder()
                .description(obj.getDescription())
                .price(obj.getPrice())
                .subtitle(obj.getSubtitle())
                .ticketsPerCategory(obj.getTicketsPerCategory())
                .title(obj.getTitle())
                .available(obj.isAvailable())
                .build();
        ticketCategory.setId(obj.getId());
        return ticketCategory;
    }

    public List<TicketCategory> convertAllForUpdate(List<TicketCategoryDto> ticketCategoryDtoList){
       List<TicketCategory> ticketCategories = new ArrayList<>();
       for(TicketCategoryDto ticketCategoryDto: ticketCategoryDtoList) {
           TicketCategory ticketCategory = this.convertWithId(ticketCategoryDto);
           ticketCategory.setDiscounts(discountConverter.convertAllForUpdate(ticketCategoryDto.getDiscountDtoList()));
           ticketCategories.add(ticketCategory);
       }
       return ticketCategories;
    }

    @Override
    public List<TicketCategory> convertAll(List<TicketCategoryDto> ticketCategoryDtoList) {
        List<TicketCategory> ticketCategories = new ArrayList<>();
        for(TicketCategoryDto ticketCategoryDto: ticketCategoryDtoList) {
            TicketCategory ticketCategory = this.convert(ticketCategoryDto);
            ticketCategory.setDiscounts(discountConverter.convertAll(ticketCategoryDto.getDiscountDtoList()));
            ticketCategories.add(ticketCategory);
        }
        return ticketCategories;
    }
}
