package ro.msg.event_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ro.msg.event_management.entity.Event;
import ro.msg.event_management.entity.EventSublocation;

import java.util.List;

public interface EventSublocationRepository extends JpaRepository<EventSublocation,Long> {
    void deleteByEvent(Event event);

    @Query("SELECT es.event.id FROM EventSublocation es " +
            "WHERE es.eventSublocationID.sublocation= :id")
    List<Long> findEventsByLocation(@Param("id") long idLocation);
}
