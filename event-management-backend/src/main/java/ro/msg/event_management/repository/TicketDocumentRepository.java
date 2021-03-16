package ro.msg.event_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.msg.event_management.entity.Ticket;
import ro.msg.event_management.entity.TicketDocument;

public interface TicketDocumentRepository extends JpaRepository<TicketDocument,Long> {
    TicketDocument findByTicket(Ticket ticket);
}
