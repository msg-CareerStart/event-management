package ro.msg.event_management.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ro.msg.event_management.entity.Event;
import ro.msg.event_management.entity.TicketCategory;

public interface TicketCategoryRepository extends JpaRepository<TicketCategory,Long> {
    List<TicketCategory> findByEvent(Event event);

    @Query("Select t from TicketCategory t where t.event.id = :id")
    List<TicketCategory> getAllForEvent(@Param("id") Long id);
}
