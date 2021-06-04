package ro.msg.event_management.controller.converter;

import org.springframework.stereotype.Component;
import ro.msg.event_management.controller.dto.DiscountDto;
import ro.msg.event_management.controller.dto.TicketCategoryDto;
import ro.msg.event_management.entity.Discount;
import ro.msg.event_management.entity.TicketCategory;

@Component
public class DiscountReverseConverter implements Converter<Discount, DiscountDto>  {
    @Override
    public DiscountDto convert(Discount obj) {
        return DiscountDto.builder()
                .code(obj.getCode())
                .percentage(obj.getPercentage())
                .id(obj.getId())
                .startDate(obj.getStartDate())
                .endDate(obj.getEndDate())
                .build();
    }
}
