package ro.msg.event.management.eventmanagementbackend.controller.converter;

import org.springframework.stereotype.Component;
import ro.msg.event.management.eventmanagementbackend.controller.dto.EventDetailsForBookingDto;
import ro.msg.event.management.eventmanagementbackend.entity.Event;
import ro.msg.event.management.eventmanagementbackend.entity.Location;

@Component
public class EventDetailsForBookingConverter implements Converter<Event, EventDetailsForBookingDto> {

    @Override
    public EventDetailsForBookingDto convert(Event obj) {
        Location location = obj.getEventSublocations().get(0).getSublocation().getLocation();
        return EventDetailsForBookingDto.builder()
                .id(obj.getId())
                .title(obj.getTitle())
                .subtitle(obj.getSubtitle())
                .startDate(obj.getStartDate())
                .endDate(obj.getEndDate())
                .startHour(obj.getStartHour())
                .endHour(obj.getEndHour())
                .ticketInfo(obj.getTicketInfo())
                .locationName(location.getName())
                .locationAddress(location.getAddress())
                .build();
    }
}
