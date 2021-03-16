package ro.msg.event_management.controller.converter;

import org.springframework.stereotype.Component;
import ro.msg.event_management.controller.dto.EventFilteringDto;
import ro.msg.event_management.entity.view.EventView;

@Component
public class EventFilterConverter implements Converter<EventView, EventFilteringDto> {
    @Override
    public EventFilteringDto convert(EventView eventView) {
        return EventFilteringDto.builder()
                .title(eventView.getTitle())
                .subtitle(eventView.getSubtitle())
                .startDate(eventView.getStartDate())
                .endDate(eventView.getEndDate())
                .startHour(eventView.getStartHour())
                .endHour(eventView.getEndHour())
                .location(eventView.getLocation())
                .occupancyRate(eventView.getRate())
                .id(eventView.getId())
                .build();
    }
}
