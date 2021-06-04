package ro.msg.event_management.controller.converter;

import org.springframework.stereotype.Component;
import ro.msg.event_management.controller.dto.CardsEventDto;
import ro.msg.event_management.controller.dto.LocationDto;
import ro.msg.event_management.entity.Event;

@Component
public class UserEventConvert implements Converter<Event, CardsEventDto> {
    @Override
    public CardsEventDto convert(Event obj) {
        LocationDto location = LocationDto.builder()
                .id(obj.getEventSublocations().get(0).getSublocation().getLocation().getId())
                .name(obj.getEventSublocations().get(0).getSublocation().getLocation().getName())
                .address(obj.getEventSublocations().get(0).getSublocation().getLocation().getAddress())
                .latitude(String.valueOf(obj.getEventSublocations().get(0).getSublocation().getLocation().getLatitude()))
                .longitude(String.valueOf(obj.getEventSublocations().get(0).getSublocation().getLocation().getLongitude()))
                .build();

        return CardsEventDto.builder()
                .id(obj.getId())
                .title(obj.getTitle())
                .startDate(obj.getStartDate())
                .endDate(obj.getEndDate())
                .startHour(obj.getStartHour())
                .endHour(obj.getEndHour())
                .locationDto(location)
                .location(location.getName())
                .build();
    }
}
