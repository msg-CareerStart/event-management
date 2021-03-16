package ro.msg.event.management.eventmanagementbackend.controller.converter;

import org.springframework.stereotype.Component;
import ro.msg.event.management.eventmanagementbackend.controller.dto.TicketCategoryDto;
import ro.msg.event.management.eventmanagementbackend.entity.TicketCategory;

@Component
public class TicketCategoryReverseConverter implements Converter<TicketCategory, TicketCategoryDto>  {
    @Override
    public TicketCategoryDto convert(TicketCategory obj) {
        return TicketCategoryDto.builder()
                .description(obj.getDescription())
                .title(obj.getTitle())
                .subtitle(obj.getSubtitle())
                .price(obj.getPrice())
                .ticketsPerCategory(obj.getTicketsPerCategory())
                .id(obj.getId())
                .available(obj.isAvailable())
                .build();
    }
}
