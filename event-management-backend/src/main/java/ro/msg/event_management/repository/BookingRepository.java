package ro.msg.event_management.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.msg.event_management.entity.Booking;
import ro.msg.event_management.entity.Event;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUserAndEvent(String user, Event event);
}
