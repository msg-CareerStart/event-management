package ro.msg.event.management.eventmanagementbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.msg.event.management.eventmanagementbackend.entity.Ticket;
import ro.msg.event.management.eventmanagementbackend.entity.TicketDocument;

public interface TicketDocumentRepository extends JpaRepository<TicketDocument,Long> {
    TicketDocument findByTicket(Ticket ticket);
}
