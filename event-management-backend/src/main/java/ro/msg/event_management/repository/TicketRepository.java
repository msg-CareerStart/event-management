package ro.msg.event_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.msg.event_management.entity.Ticket;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
}
