package ro.msg.event.management.eventmanagementbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.msg.event.management.eventmanagementbackend.entity.Booking;
import ro.msg.event.management.eventmanagementbackend.entity.Event;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUserAndEvent(String user, Event event);
}
