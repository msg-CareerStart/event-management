package ro.msg.event_management.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ro.msg.event_management.entity.Ticket;
import ro.msg.event_management.entity.TicketDocument;
import ro.msg.event_management.repository.TicketDocumentRepository;

@Service
@RequiredArgsConstructor
public class TicketDocumentService {

    private final TicketDocumentRepository ticketDocumentRepository;

    public TicketDocument findByTicket(Ticket ticket){
        return ticketDocumentRepository.findByTicket(ticket);
    }

}
