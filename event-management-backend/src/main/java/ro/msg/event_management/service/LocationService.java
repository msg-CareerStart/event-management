package ro.msg.event_management.service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ro.msg.event_management.controller.converter.LocationConverter;
import ro.msg.event_management.controller.converter.LocationReverseConverter;
import ro.msg.event_management.controller.dto.LocationDto;
import ro.msg.event_management.entity.Event;
import ro.msg.event_management.entity.EventSublocation;
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
    private final LocationReverseConverter locationReverseConverter;

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
            sublocationList.get(0).setLocation(null);
            location.setSublocation(sublocationList);
            return location;
        }
        return null;
    }

    public List<LocationDto> getLocationsByEvent(Event event) {

        List<LocationDto> searchedLocations = new ArrayList<>();
        List<EventSublocation> eventSublocation = event.getEventSublocations();

        for(EventSublocation e: eventSublocation){
            Sublocation sublocation = e.getSublocation();
            Location location = sublocation.getLocation();
            LocationDto foundLocation = locationReverseConverter.convert(location);
            searchedLocations.add(foundLocation);
        }

        return searchedLocations;
    }
}
