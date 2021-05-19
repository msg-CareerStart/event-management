package ro.msg.event_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.msg.event_management.entity.Location;

public interface LocationRepository extends JpaRepository<Location,Long> {
    Location findByName(String name);

    Location findByNameAndAddress(String name, String address);
}
