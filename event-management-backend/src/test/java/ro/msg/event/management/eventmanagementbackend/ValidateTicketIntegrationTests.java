package ro.msg.event.management.eventmanagementbackend;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.time.LocalDateTime;
import javax.transaction.Transactional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import ro.msg.event.management.eventmanagementbackend.entity.Booking;
import ro.msg.event.management.eventmanagementbackend.entity.Event;
import ro.msg.event.management.eventmanagementbackend.entity.Ticket;
import ro.msg.event.management.eventmanagementbackend.entity.TicketCategory;
import ro.msg.event.management.eventmanagementbackend.entity.TicketDocument;
import ro.msg.event.management.eventmanagementbackend.exception.TicketCorrespondingEventException;
import ro.msg.event.management.eventmanagementbackend.exception.TicketValidateException;
import ro.msg.event.management.eventmanagementbackend.repository.BookingRepository;
import ro.msg.event.management.eventmanagementbackend.repository.EventRepository;
import ro.msg.event.management.eventmanagementbackend.repository.TicketCategoryRepository;
import ro.msg.event.management.eventmanagementbackend.repository.TicketDocumentRepository;
import ro.msg.event.management.eventmanagementbackend.repository.TicketRepository;
import ro.msg.event.management.eventmanagementbackend.service.TicketService;

@SpringBootTest
@Transactional
@ActiveProfiles("test")
class ValidateTicketIntegrationTests {

    @Autowired
    TicketService ticketService;

    @Autowired
    EventRepository eventRepository;

    @Autowired
    BookingRepository bookingRepository;

    @Autowired
    TicketCategoryRepository ticketCategoryRepository;

    @Autowired
    TicketRepository ticketRepository;

    @Autowired
    TicketDocumentRepository ticketDocumentRepository;

    @Test
    void validateTicket_TicketHasNotYetBeenValidate_thenValidatedSuccessfully() {
        Event event = new Event();
        eventRepository.save(event);

        Booking booking = new Booking(LocalDateTime.now(), "user", event, null);
        bookingRepository.save(booking);

        TicketCategory ticketCategory = new TicketCategory("title", "subtitle", (float) 3.4, "description", 4, true, event, null);
        ticketCategoryRepository.save(ticketCategory);


        Ticket ticket = new Ticket("name", "name@yahoo.com", booking, ticketCategory, null);
        ticketRepository.save(ticket);

        TicketDocument ticketDocument = new TicketDocument("pdf_url", false, null);
        ticketDocument.setTicket(ticket);
        ticket.setTicketDocument(ticketDocument);
        ticketDocumentRepository.save(ticketDocument);

        try {
            ticketService.validateTicket(event.getId(), ticket.getId());
        } catch (TicketValidateException | TicketCorrespondingEventException ticketValidateException) {
            assert false;
        }

        assertThat(ticketDocumentRepository.findByTicket(ticket).isValidate()).isTrue();
    }

    @Test
    void validateTicket_hasAlreadyBeenValidated_thenThrowException() {
        Event event = new Event();
        eventRepository.save(event);

        Booking booking = new Booking(LocalDateTime.now(), "user", event, null);
        bookingRepository.save(booking);

        TicketCategory ticketCategory = new TicketCategory("titleTicketCategory", "subtitleCategory", (float) 3.4, "description", 4, true, event, null);
        ticketCategoryRepository.save(ticketCategory);


        Ticket ticket = new Ticket("name", "address@yahoo.com", booking, ticketCategory, null);
        ticketRepository.save(ticket);

        TicketDocument ticketDocument = new TicketDocument("pdf_url", true, null);
        ticketDocument.setTicket(ticket);
        ticket.setTicketDocument(ticketDocument);
        ticketDocumentRepository.save(ticketDocument);

        assertThrows(TicketValidateException.class,
                () -> ticketService.validateTicket(event.getId(), ticket.getId())
        );
    }


    @Test
    void validateTicket_TicketIsForAnotherEvent_thenThrowException() {

        Event event = new Event();
        eventRepository.save(event);

        Event anotherEvent = new Event();
        eventRepository.save(anotherEvent);

        Booking booking = new Booking(LocalDateTime.now(), "user", event, null);
        bookingRepository.save(booking);

        TicketCategory ticketCategory = new TicketCategory("titleCategory", "subtitleCategory", (float) 3.4, "description", 4, true, event, null);
        ticketCategoryRepository.save(ticketCategory);


        Ticket ticket = new Ticket("name", "name@yahoo.com", booking, ticketCategory, null);
        ticketRepository.save(ticket);

        TicketDocument ticketDocument = new TicketDocument("pdf_url", false, null);
        ticketDocument.setTicket(ticket);
        ticket.setTicketDocument(ticketDocument);
        ticketDocumentRepository.save(ticketDocument);

        assertThrows(TicketCorrespondingEventException.class,
                () -> ticketService.validateTicket(anotherEvent.getId(), ticket.getId())
        );
    }
}
