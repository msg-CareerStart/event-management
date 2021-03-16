package ro.msg.event.management.eventmanagementbackend;

import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import ro.msg.event.management.eventmanagementbackend.entity.Booking;
import ro.msg.event.management.eventmanagementbackend.entity.Event;
import ro.msg.event.management.eventmanagementbackend.entity.Ticket;
import ro.msg.event.management.eventmanagementbackend.entity.TicketCategory;
import ro.msg.event.management.eventmanagementbackend.exception.TicketBuyingException;
import ro.msg.event.management.eventmanagementbackend.repository.BookingRepository;
import ro.msg.event.management.eventmanagementbackend.repository.EventRepository;
import ro.msg.event.management.eventmanagementbackend.repository.TicketRepository;
import ro.msg.event.management.eventmanagementbackend.service.BookingService;

@SpringBootTest
@ActiveProfiles("test")
class SaveBookingIntegrationTests {
    private final BookingRepository bookingRepository;
    private final EventRepository eventRepository;
    private final BookingService bookingService;
    private final TicketRepository ticketRepository;

    @Autowired
    public SaveBookingIntegrationTests(BookingRepository bookingRepository, EventRepository eventRepository, BookingService bookingService, TicketRepository ticketRepository) {
        this.bookingRepository = bookingRepository;
        this.eventRepository = eventRepository;
        this.bookingService = bookingService;
        this.ticketRepository = ticketRepository;
    }

    @Test
    void saveBooking_validNumberOfTickets_bookingAndTicketsSaved() {
        TicketCategory testCategory = new TicketCategory();
        testCategory.setTicketsPerCategory(10);
        testCategory.setTitle("test1");
        List<TicketCategory> testCategories = new ArrayList<>();
        testCategories.add(testCategory);
        Event testEvent = new Event();
        testEvent.setTicketsPerUser(10);
        testEvent.setTicketCategories(testCategories);
        testCategory.setEvent(testEvent);
        testEvent = eventRepository.save(testEvent);

        Booking testBooking = new Booking();
        Ticket testTicket1 = new Ticket();
        testTicket1.setEmailAddress("1");
        testTicket1.setName("1");
        Ticket testTicket2 = new Ticket();
        testTicket2.setEmailAddress("2");
        testTicket2.setName("2");
        List<Ticket> testTickets = new ArrayList<>();
        testTickets.add(testTicket1);
        testTickets.add(testTicket2);
        Map<String, List<Ticket>> testCategoryWithTickets = new HashMap<>();
        testCategoryWithTickets.put(testEvent.getTicketCategories().get(0).getTitle(), testTickets);

        long nrOfBookingsBeforeSave = this.bookingRepository.count();
        long nrOfTicketsBeforeSave = this.ticketRepository.count();
        long eventId = testEvent.getId();
        Booking savedBooking = this.bookingService.saveBooking(testBooking, testCategoryWithTickets, eventId);
        assert this.bookingRepository.count() == nrOfBookingsBeforeSave + 1;
        assert this.ticketRepository.count() == nrOfTicketsBeforeSave + 2;
        assert savedBooking.getEvent().getId().equals(testEvent.getId());
        assert savedBooking.getTickets().size() == 2;
    }

    @Test
    void saveBooking_nrOfTicketsExceedsTicketsPerUser_exceptionThrown() {
        TicketCategory testCategory1 = new TicketCategory();
        testCategory1.setTicketsPerCategory(10);
        testCategory1.setTitle("test1");
        TicketCategory testCategory2 = new TicketCategory();
        testCategory2.setTicketsPerCategory(10);
        testCategory2.setTitle("test2");
        List<TicketCategory> testCategories = new ArrayList<>();
        testCategories.add(testCategory1);
        testCategories.add(testCategory2);
        Event testEvent = new Event();
        testEvent.setTicketsPerUser(1);
        testEvent.setTicketCategories(testCategories);
        testCategory1.setEvent(testEvent);
        testCategory2.setEvent(testEvent);
        testEvent = eventRepository.save(testEvent);

        Booking testBooking = new Booking();
        Ticket testTicket1 = new Ticket();
        testTicket1.setEmailAddress("1");
        testTicket1.setName("1");
        Ticket testTicket2 = new Ticket();
        testTicket2.setEmailAddress("1");
        testTicket2.setName("1");
        List<Ticket> testTickets1 = new ArrayList<>();
        testTickets1.add(testTicket1);
        List<Ticket> testTickets2 = new ArrayList<>();
        testTickets2.add(testTicket2);
        Map<String, List<Ticket>> testCategoryWithTickets = new HashMap<>();
        testCategoryWithTickets.put(testEvent.getTicketCategories().get(0).getTitle(), testTickets1);
        testCategoryWithTickets.put(testEvent.getTicketCategories().get(1).getTitle(), testTickets2);

        long eventId = testEvent.getId();
        assertThrows(TicketBuyingException.class,
                () -> this.bookingService.saveBooking(testBooking, testCategoryWithTickets, eventId));
    }

    @Test
    void saveBooking_nrOfTicketsExceedsTicketsPerCategory_exceptionThrown() {
        TicketCategory testCategory = new TicketCategory();
        testCategory.setTicketsPerCategory(1);
        testCategory.setTitle("test1");
        List<TicketCategory> testCategories = new ArrayList<>();
        testCategories.add(testCategory);
        Event testEvent = new Event();
        testEvent.setTicketsPerUser(10);
        testEvent.setTicketCategories(testCategories);
        testCategory.setEvent(testEvent);
        testEvent = eventRepository.save(testEvent);

        Booking testBooking = new Booking();
        Ticket testTicket1 = new Ticket();
        testTicket1.setEmailAddress("1");
        testTicket1.setName("1");
        Ticket testTicket2 = new Ticket();
        testTicket2.setEmailAddress("2");
        testTicket2.setName("2");
        List<Ticket> testTickets = new ArrayList<>();
        testTickets.add(testTicket1);
        testTickets.add(testTicket2);
        Map<String, List<Ticket>> testCategoryWithTickets = new HashMap<>();
        testCategoryWithTickets.put(testEvent.getTicketCategories().get(0).getTitle(), testTickets);


        long eventId = testEvent.getId();
        assertThrows(TicketBuyingException.class,
                () -> this.bookingService.saveBooking(testBooking, testCategoryWithTickets, eventId));
    }
}
