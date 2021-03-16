package ro.msg.event.management.eventmanagementbackend.controller.converter;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;
import ro.msg.event.management.eventmanagementbackend.controller.dto.TicketCategoryDto;
import ro.msg.event.management.eventmanagementbackend.entity.TicketCategory;

@Component
public class TicketCategoryConverter implements Converter<TicketCategoryDto, TicketCategory> {
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
       return ticketCategoryDtoList.stream().map(this::convertWithId).collect(Collectors.toList());
    }
}
