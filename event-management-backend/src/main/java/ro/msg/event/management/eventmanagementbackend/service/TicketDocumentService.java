package ro.msg.event.management.eventmanagementbackend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ro.msg.event.management.eventmanagementbackend.entity.Ticket;
import ro.msg.event.management.eventmanagementbackend.entity.TicketDocument;
import ro.msg.event.management.eventmanagementbackend.repository.TicketDocumentRepository;

@Service
@RequiredArgsConstructor
public class TicketDocumentService {

    private final TicketDocumentRepository ticketDocumentRepository;

    public TicketDocument findByTicket(Ticket ticket){
        return ticketDocumentRepository.findByTicket(ticket);
    }

}
