package ro.msg.event_management.controller.converter;

import org.springframework.stereotype.Component;
import ro.msg.event_management.controller.dto.CardsUserEventDto;
import ro.msg.event_management.entity.view.EventView;

@Component
public class CardsUserEventConverter implements Converter<EventView, CardsUserEventDto>{
    @Override
    public CardsUserEventDto convert(EventView eventView) {
        return CardsUserEventDto.builder()
                .id(eventView.getId())
                .title(eventView.getTitle())
                .location(eventView.getLocation())
                .startDate(eventView.getStartDate())
                .endDate(eventView.getEndDate())
                .startTime(eventView.getStartHour())
                .endTime(eventView.getEndHour())
                .rate(eventView.getRate())
                .picture(eventView.getPictureUrl())
                .description(eventView.getDescription())
                .build();
    }
}
