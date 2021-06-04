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
import ro.msg.event_management.entity.*;
import ro.msg.event_management.repository.*;

@Service
@RequiredArgsConstructor
public class LocationService {

    private final LocationRepository locationRepository;
    private final SublocationRepository sublocationRepository;
    private final LocationConverter locationConverter;
    private final LocationReverseConverter locationReverseConverter;
    private final EventSublocationRepository eventSublocationRepository;
    private final EventRepository eventRepository;
    private final TicketCategoryRepository ticketCategoryRepository;

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

    public List<LocationStatistics> getLocationStatistics()
    {
        List<LocationStatistics> locationStatistics = new ArrayList<>();
        List<Long> allLocationsIds = this.locationRepository.getAllLocationIds();

        for(Long locationId: allLocationsIds)
        {
            LocationStatistics locStats = new LocationStatistics();
            locStats.setIdLocation(locationId);

            List<Long> eventsAtLocation = this.eventSublocationRepository.findEventsByLocation(locationId);

            List<EventStatistics> eventStatistics = new ArrayList<>();
            for(Long eventId: eventsAtLocation)
            {
                int availableTickets = 0;
                try{
                    availableTickets = (int)this.eventRepository.getAvailableTicketsForEvent(eventId);
                }
                catch(Exception e){
                    availableTickets = 0;
                }
                int soldTickets = this.ticketCategoryRepository.getSoldTicketsForEvent(eventId);
                int totalTIckets = soldTickets + availableTickets;
                int validatedTickets = this.eventRepository.getNrOfValidatedTicketsForEvent(eventId);
                int unvalidatedSoldTickets = soldTickets - validatedTickets;

                EventStatistics eventStats = EventStatistics.builder()
                        .id(eventId)
                        .availableTickets(availableTickets)
                        .totalTickets(totalTIckets)
                        .unvalidatedTickets(unvalidatedSoldTickets)
                        .validatedTickets(validatedTickets)
                        .build();

                eventStatistics.add(eventStats);
            }

            locStats.setEventStatistics(eventStatistics);
            locationStatistics.add(locStats);
        }

        return locationStatistics;
    }
}
