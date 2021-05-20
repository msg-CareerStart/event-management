package ro.msg.event_management;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.ActiveProfiles;
import ro.msg.event_management.entity.Booking;
import ro.msg.event_management.entity.Event;
import ro.msg.event_management.entity.EventSublocation;
import ro.msg.event_management.entity.EventSublocationID;
import ro.msg.event_management.entity.Location;
import ro.msg.event_management.entity.Sublocation;
import ro.msg.event_management.entity.Ticket;
import ro.msg.event_management.entity.view.EventView;
import ro.msg.event_management.repository.BookingRepository;
import ro.msg.event_management.repository.EventRepository;
import ro.msg.event_management.repository.EventSublocationRepository;
import ro.msg.event_management.repository.LocationRepository;
import ro.msg.event_management.repository.SublocationRepository;
import ro.msg.event_management.repository.TicketRepository;
import ro.msg.event_management.service.EventService;
import ro.msg.event_management.utils.SortCriteria;
import org.junit.jupiter.api.BeforeEach;

@SpringBootTest
@ActiveProfiles("test")
public class AdminHomepageIntegrationTests {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private SublocationRepository sublocationRepository;

    @Autowired
    private EventSublocationRepository eventSublocationRepository;

    @Autowired
    private LocationRepository locationRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private EventService eventService;

    private static final LocalDate MAX_DATE = LocalDate.parse("2999-12-31");
    private static final LocalDate MIN_DATE = LocalDate.parse("1900-01-01");


    @BeforeEach
    void setUp() {
        this.eventRepository.deleteAll();
        this.sublocationRepository.deleteAll();
        this.eventSublocationRepository.deleteAll();
        this.locationRepository.deleteAll();
        this.bookingRepository.deleteAll();
        this.ticketRepository.deleteAll();
    }

    @Test
    public void testFilterAndSorting() {
        Event event1 = new Event("Tile", "Subtitle", true, LocalDate.parse("2020-11-11"), LocalDate.parse("2020-11-15"), LocalTime.parse("18:00"), LocalTime.parse("20:00"), 10, "descr", true, "no obs", 3, "someUser", "ticket info", null, null, null, null);
        Event event2 = new Event("Tile2", "Subtitle2", true, LocalDate.parse("2020-11-14"), LocalDate.parse("2020-11-19"), LocalTime.parse("10:00"), LocalTime.parse("12:00"), 12, "descr2", true, "no obs", 3, "someUser", "ticket info", null, null, null, null);
        Event event3 = new Event("Tile3", "Subtitle3", true, LocalDate.parse("2021-11-14"), LocalDate.parse("2021-11-19"), LocalTime.parse("10:00"), LocalTime.parse("12:00"), 12, "descr2", true, "no obs", 3, "someUser", "ticket info", null, null, null, null);
        Event event4 = new Event("Tile3", "Subtitle3", true, LocalDate.parse("2019-11-14"), LocalDate.parse("2019-11-19"), LocalTime.parse("10:00"), LocalTime.parse("12:00"), 12, "descr2", true, "no obs", 3, "someUser", "ticket info", null, null, null, null);
        Location location1 = new Location("Campus", "Obs 23", (float) 34.55, (float) 55.76, null, null);
        Location location2 = new Location("Centru", "Ferdinand 45", (float) 44.6, (float) 99.0, null, null);
        Sublocation sublocation1 = new Sublocation("same", 15, location1, null);
        Sublocation sublocation2 = new Sublocation("sameCentru", 20, location2, null);
        event1 = eventRepository.save(event1);
        event2 = eventRepository.save(event2);
        event3 = eventRepository.save(event3);
        event4 = eventRepository.save(event4);
        location1 = locationRepository.save(location1);
        location2 = locationRepository.save(location2);
        sublocation1 = sublocationRepository.save(sublocation1);
        sublocation2 = sublocationRepository.save(sublocation2);

        EventSublocation eventSublocation1 = new EventSublocation(event1, sublocation1);
        EventSublocationID eventSublocationID1 = new EventSublocationID(event1.getId(), sublocation1.getId());
        eventSublocation1.setEventSublocationID(eventSublocationID1);


        EventSublocation eventSublocation2 = new EventSublocation(event2, sublocation2);
        EventSublocationID eventSublocationID2 = new EventSublocationID(event2.getId(), sublocation2.getId());
        eventSublocation2.setEventSublocationID(eventSublocationID2);

        eventSublocation1 = eventSublocationRepository.save(eventSublocation1);
        eventSublocation2 = eventSublocationRepository.save(eventSublocation2);

        Booking booking11 = new Booking(LocalDateTime.now(), "someUser", event1, null);
        Booking booking12 = new Booking(LocalDateTime.now(), "otherUser", event1, null);

        Ticket ticket111 = new Ticket("Andrei", "email@yahoo.com", booking11, null, null);
        Ticket ticket112 = new Ticket("Ioana", "ioa@yahoo.com", booking11, null, null);
        Ticket ticket121 = new Ticket("Maria", "ma@yahoo.com", booking12, null, null);

        booking11 = bookingRepository.save(booking11);
        booking12 = bookingRepository.save(booking12);
        ticket111 = ticketRepository.save(ticket111);
        ticket112 = ticketRepository.save(ticket112);
        ticket121 = ticketRepository.save(ticket121);

        Pageable pageable = PageRequest.of(0, 4);


        List<EventView> eventViewList = eventService.filter(pageable, null, null, null, null, null, LocalDate.parse("2017-11-14"), MAX_DATE, null, null, null, null, null, null, SortCriteria.DATE, true, null).getContent();
        EventView eventViewBefore = eventViewList.get(0);
        for (EventView eventView : eventViewList) {
            assert(!(eventView.getStartDate().isBefore(eventViewBefore.getStartDate()) && !(eventView.getStartDate().isEqual(eventViewBefore.getStartDate()))));

            eventViewBefore.setStartDate(eventView.getStartDate());
        }
    }
}
