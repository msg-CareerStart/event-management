package ro.msg.event_management.controller.converter;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import ro.msg.event_management.controller.dto.LocationDto;
import ro.msg.event_management.entity.Location;

@Component
@AllArgsConstructor
public class LocationReverseConverter implements Converter<Location, LocationDto> {
    @Override
    public LocationDto convert(Location location) {
        return LocationDto.builder()
                .id(location.getId())
                .name(location.getName())
                .address(location.getAddress())
                .latitude(Float.toString(location.getLatitude()))
                .longitude(Float.toString(location.getLongitude()))
                .build();
    }
}
