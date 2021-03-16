package ro.msg.event.management.eventmanagementbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.msg.event.management.eventmanagementbackend.entity.Ticket;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
}
