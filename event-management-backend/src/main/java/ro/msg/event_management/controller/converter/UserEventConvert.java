package ro.msg.event_management.controller.converter;

import org.springframework.stereotype.Component;
import ro.msg.event_management.controller.dto.CardsEventDto;
import ro.msg.event_management.entity.Event;

@Component
public class UserEventConvert implements Converter<Event, CardsEventDto> {
    @Override
    public CardsEventDto convert(Event obj) {
        return CardsEventDto.builder()
                .id(obj.getId())
                .startDate(obj.getStartDate())
                .endDate(obj.getEndDate())
                .title(obj.getTitle())
                .build();
    }
}
