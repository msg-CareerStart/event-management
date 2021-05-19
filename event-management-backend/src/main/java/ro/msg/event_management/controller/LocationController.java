package ro.msg.event_management.controller;

import java.util.List;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ro.msg.event_management.controller.converter.LocationReverseConverter;
import ro.msg.event_management.controller.dto.LocationDto;
import ro.msg.event_management.entity.Location;
import ro.msg.event_management.service.LocationService;

@RestController
@AllArgsConstructor
@RequestMapping("/locations")
@CrossOrigin
public class LocationController {
    private final LocationService locationService;
    private final LocationReverseConverter locationReverseConverter;

    @GetMapping("")
//    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    public List<LocationDto> getLocations() {
        List<LocationDto> locationDtos = locationReverseConverter.convertAll(this.locationService.getLocations());
//        return new ResponseEntity<>(locationDtos, HttpStatus.OK);
        return locationDtos;
    }

    @PostMapping(value="/insert")
    public Location addLocation(@RequestBody LocationDto locationDto){
        Location newLocation = locationService.addLocation(locationDto, 100);
        return newLocation;
    }
}
