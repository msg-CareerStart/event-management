package ro.msg.event_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.msg.event_management.entity.Event;
import ro.msg.event_management.entity.EventSublocation;

public interface EventSublocationRepository extends JpaRepository<EventSublocation,Long> {
    void deleteByEvent(Event event);
}
