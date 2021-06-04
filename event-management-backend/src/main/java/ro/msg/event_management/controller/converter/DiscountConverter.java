package ro.msg.event_management.controller.converter;

import org.springframework.stereotype.Component;
import ro.msg.event_management.controller.dto.DiscountDto;
import ro.msg.event_management.entity.Discount;
import ro.msg.event_management.entity.TicketCategory;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class DiscountConverter implements  Converter<DiscountDto, Discount>{
    @Override
    public Discount convert(DiscountDto obj) {
        return Discount.builder()
                .code(obj.getCode())
                .percentage(obj.getPercentage())
                .startDate(obj.getStartDate())
                .endDate(obj.getEndDate())
                .build();
    }

    public Discount convertWithId(DiscountDto obj) {
        Discount discount = Discount.builder()
                .code(obj.getCode())
                .percentage(obj.getPercentage())
                .startDate(obj.getStartDate())
                .endDate(obj.getEndDate())
                .build();
        discount.setId(obj.getId());
        return discount;
    }

    public List<Discount> convertAllForUpdate(List<DiscountDto> discountDtoList) {
        if(discountDtoList == null) {
            return new ArrayList<>();
        }
        return discountDtoList.stream().map(this::convertWithId).collect(Collectors.toList());
    }

    @Override
    public List<Discount> convertAll(List<DiscountDto> objList) {
        if(objList == null) {
            return new ArrayList<>();
        }
        return objList.stream().map(this::convert).collect(Collectors.toList());
    }
}
