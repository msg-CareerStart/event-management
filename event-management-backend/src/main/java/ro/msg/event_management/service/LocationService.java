package ro.msg.event_management.service;

import java.util.*;
import java.util.logging.Logger;

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
@Slf4j
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
            log.info("We don't have this location in our database...");
            Location location = locationConverter.convert(locationDto);
            List<Sublocation> sublocationList = new ArrayList<Sublocation>();

            Sublocation searchedSublocation = sublocationRepository.findByName(locationDto.getName());
            if (searchedSublocation != null) {
                log.info("We have this sublocation in our database, so we don't add another one...");
                sublocationList.add(searchedSublocation);
            } else {
                log.info("We don't have this sublocation in our database...");
                Sublocation sublocation = new Sublocation(locationDto.getName(), capacity, null, null);
                sublocationRepository.save(sublocation);
                sublocationList.add(sublocation);
            }
            location.setSublocation(sublocationList);
            locationRepository.save(location);
            return location;
        }else {
            log.info("We have this location in our database, so we don't add another one...");
        }
        return null;
    }
}
