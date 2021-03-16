package ro.msg.event.management.eventmanagementbackend.controller;

import java.util.List;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ro.msg.event.management.eventmanagementbackend.controller.converter.LocationReverseConverter;
import ro.msg.event.management.eventmanagementbackend.controller.dto.LocationDto;
import ro.msg.event.management.eventmanagementbackend.service.LocationService;

@RestController
@AllArgsConstructor
@RequestMapping("/locations")
@CrossOrigin
public class LocationController {
    private final LocationService locationService;
    private final LocationReverseConverter locationReverseConverter;

    @GetMapping("")
    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    public ResponseEntity<List<LocationDto>> getLocations() {
        List<LocationDto> locationDtos = locationReverseConverter.convertAll(this.locationService.getLocations());
        return new ResponseEntity<>(locationDtos, HttpStatus.OK);
    }
}
