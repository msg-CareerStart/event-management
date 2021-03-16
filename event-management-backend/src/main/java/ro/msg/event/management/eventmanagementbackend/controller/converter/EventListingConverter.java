package ro.msg.event.management.eventmanagementbackend.controller.converter;

import org.springframework.stereotype.Component;
import ro.msg.event.management.eventmanagementbackend.controller.dto.EventListingDto;
import ro.msg.event.management.eventmanagementbackend.entity.view.EventView;

@Component
public class EventListingConverter implements Converter<EventView, EventListingDto> {
    @Override
    public EventListingDto convert(EventView eventView) {
        return EventListingDto.builder()
                .id(eventView.getId())
                .title(eventView.getTitle())
                .startDate(eventView.getStartDate())
                .endDate(eventView.getEndDate())
                .location(eventView.getLocation())
                .build();
    }
}
