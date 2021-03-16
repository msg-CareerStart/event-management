package ro.msg.event.management.eventmanagementbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.msg.event.management.eventmanagementbackend.entity.Event;
import ro.msg.event.management.eventmanagementbackend.entity.EventSublocation;

public interface EventSublocationRepository extends JpaRepository<EventSublocation,Long> {
    void deleteByEvent(Event event);
}
