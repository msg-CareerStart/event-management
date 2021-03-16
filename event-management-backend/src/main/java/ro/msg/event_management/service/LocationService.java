package ro.msg.event_management.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ro.msg.event_management.entity.Location;
import ro.msg.event_management.repository.LocationRepository;

@Service
@RequiredArgsConstructor
public class LocationService {

    private final LocationRepository locationRepository;

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
}
