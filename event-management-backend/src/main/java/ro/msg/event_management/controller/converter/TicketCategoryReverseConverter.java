package ro.msg.event_management.controller.converter;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import ro.msg.event_management.controller.dto.TicketCategoryDto;
import ro.msg.event_management.entity.TicketCategory;

@Component
@AllArgsConstructor
public class TicketCategoryReverseConverter implements Converter<TicketCategory, TicketCategoryDto>  {

    private final DiscountReverseConverter discountReverseConverter;

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
                .discountDtoList(discountReverseConverter.convertAll(obj.getDiscounts()))
                .build();
    }
}
