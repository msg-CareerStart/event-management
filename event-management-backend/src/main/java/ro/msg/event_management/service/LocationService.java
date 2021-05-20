package ro.msg.event_management.service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ro.msg.event_management.controller.converter.LocationConverter;
import ro.msg.event_management.controller.dto.LocationDto;
import ro.msg.event_management.entity.Location;
import ro.msg.event_management.entity.Sublocation;
import ro.msg.event_management.repository.LocationRepository;
import ro.msg.event_management.repository.SublocationRepository;

@Service
@RequiredArgsConstructor
public class LocationService {

    private final LocationRepository locationRepository;
    private final SublocationRepository sublocationRepository;
    private final LocationConverter locationConverter;

    public Location findByID(long id) {
        Optional<Location> locationOptional = this.locationRepository.findById(id);
        if(locationOptional.isEmpty())
        {
            throw new NoSuchElementException("No location with id= " + id);
        }
        return locationOptional.get();
    }

    public List<Location> getLocations() {
        return this.locationRepository.findAll();
    }

    public Location addLocation(LocationDto locationDto, int capacity){

        Location findLocationInDB = locationRepository.findByNameAndAddress(locationDto.getName(), locationDto.getAddress());
        if(findLocationInDB == null) {
            Location location = locationConverter.convert(locationDto);
            List<Sublocation> sublocationList = new ArrayList<>();
            location = locationRepository.save(location);
            Sublocation searchedSublocation = sublocationRepository.findByName(locationDto.getName());
            if (searchedSublocation != null) {
                sublocationList.add(searchedSublocation);
            } else {
                Sublocation sublocation = new Sublocation(locationDto.getAddress(), capacity, location, null);
                sublocation = sublocationRepository.save(sublocation);
                sublocationList.add(sublocation);
            }
            location.setSublocation(sublocationList);
            location = locationRepository.save(location);
            return location;
        }
        return null;
    }
}
