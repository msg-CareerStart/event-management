package ro.msg.event.management.eventmanagementbackend.repository;

import org.hibernate.sql.Select;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ro.msg.event.management.eventmanagementbackend.entity.TicketCategory;

import java.util.List;

public interface TicketCategoryRepository extends JpaRepository<TicketCategory,Long> {

    @Query("Select t from TicketCategory t where t.event.id = :id")
    List<TicketCategory> getAllForEvent(@Param("id") Long id);
}
