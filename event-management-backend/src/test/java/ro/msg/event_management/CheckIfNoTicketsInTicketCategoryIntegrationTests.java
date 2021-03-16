package ro.msg.event_management;

import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import javax.transaction.Transactional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import ro.msg.event_management.entity.Booking;
import ro.msg.event_management.entity.Ticket;
import ro.msg.event_management.entity.TicketCategory;
import ro.msg.event_management.repository.BookingRepository;
import ro.msg.event_management.repository.TicketCategoryRepository;
import ro.msg.event_management.repository.TicketRepository;
import ro.msg.event_management.service.TicketCategoryService;

@SpringBootTest
@ActiveProfiles("test")
public class CheckIfNoTicketsInTicketCategoryIntegrationTests {
    private final TicketCategoryService ticketCategoryService;
    private final TicketCategoryRepository ticketCategoryRepository;
    private final BookingRepository bookingRepository;
    private final TicketRepository ticketRepository;

    @Autowired
    public CheckIfNoTicketsInTicketCategoryIntegrationTests(TicketCategoryService ticketCategoryService, TicketCategoryRepository ticketCategoryRepository, BookingRepository bookingRepository, TicketRepository ticketRepository) {
        this.ticketCategoryService = ticketCategoryService;
        this.ticketCategoryRepository = ticketCategoryRepository;
        this.bookingRepository = bookingRepository;
        this.ticketRepository = ticketRepository;
    }

    @Test
    @Transactional
    void checkIfNoTicketsInTicketCategory_ticketExists_returnsFalse() {
        TicketCategory ticketCategory = new TicketCategory();
        Booking booking = new Booking();
        Ticket ticket = new Ticket();

        List<Ticket> tickets = new ArrayList<>();
        tickets.add(ticket);
        ticketCategory.setTickets(tickets);
        ticket.setTicketCategory(ticketCategory);

        booking.setTickets(tickets);
        ticket.setBooking(booking);

        this.bookingRepository.save(booking);
        this.ticketCategoryRepository.save(ticketCategory);
        this.ticketRepository.save(ticket);

        assert (!this.ticketCategoryService.checkIfNoTicketsForCategory(ticketCategory.getId()));
    }

    @Test
    @Transactional
    void checkIfNoTicketsInTicketCategory_noTickets_returnsTrue() {
        TicketCategory ticketCategory = new TicketCategory();
        Booking booking = new Booking();

        this.bookingRepository.save(booking);
        this.ticketCategoryRepository.save(ticketCategory);

        assert (this.ticketCategoryService.checkIfNoTicketsForCategory(ticketCategory.getId()));
    }

    @Test
    @Transactional
    void checkIfNoTicketsInTicketCategory_noSuchTicketCategory_exceptionThrown() {
        TicketCategory ticketCategory = new TicketCategory();
        Booking booking = new Booking();

        this.bookingRepository.save(booking);
        this.ticketCategoryRepository.save(ticketCategory);

        assertThrows(NoSuchElementException.class,
                () -> {
                    this.ticketCategoryService.checkIfNoTicketsForCategory(100);
                });
    }
}
