package ro.msg.event_management.controller.converter;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import ro.msg.event_management.controller.dto.LocationDto;
import ro.msg.event_management.entity.Location;

@Component
@AllArgsConstructor
public class LocationConverter implements  Converter<LocationDto, Location> {

    @Override
    public Location convert(LocationDto obj) {
        return Location.builder()
                .name(obj.getName())
                .address(obj.getAddress())
                .latitude(Float.parseFloat(obj.getLatitude()))
                .longitude(Float.parseFloat(obj.getLongitude()))
                .programs(null)
                .build();
    }
}


