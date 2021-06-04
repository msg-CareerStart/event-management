package ro.msg.event_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ro.msg.event_management.entity.Location;

import java.util.List;

public interface LocationRepository extends JpaRepository<Location,Long> {
    Location findByNameAndAddress(String name, String address);

    @Query("SELECT l.id FROM Location l")
    List<Long> getAllLocationIds();
}
