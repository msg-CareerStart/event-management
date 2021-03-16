package ro.msg.event.management.eventmanagementbackend;

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
import ro.msg.event.management.eventmanagementbackend.entity.Booking;
import ro.msg.event.management.eventmanagementbackend.entity.Event;
import ro.msg.event.management.eventmanagementbackend.entity.EventSublocation;
import ro.msg.event.management.eventmanagementbackend.entity.EventSublocationID;
import ro.msg.event.management.eventmanagementbackend.entity.Location;
import ro.msg.event.management.eventmanagementbackend.entity.Sublocation;
import ro.msg.event.management.eventmanagementbackend.entity.Ticket;
import ro.msg.event.management.eventmanagementbackend.entity.view.EventView;
import ro.msg.event.management.eventmanagementbackend.repository.BookingRepository;
import ro.msg.event.management.eventmanagementbackend.repository.EventRepository;
import ro.msg.event.management.eventmanagementbackend.repository.EventSublocationRepository;
import ro.msg.event.management.eventmanagementbackend.repository.LocationRepository;
import ro.msg.event.management.eventmanagementbackend.repository.SublocationRepository;
import ro.msg.event.management.eventmanagementbackend.repository.TicketRepository;
import ro.msg.event.management.eventmanagementbackend.service.EventService;
import ro.msg.event.management.eventmanagementbackend.utils.ComparisonSign;

@SpringBootTest
@ActiveProfiles("test")
public class FilterEventsIntegrationTests {

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

    @Test
    public void filter_by_date_and_rate() {
        Event event1 = new Event("Tile", "Subtitle", true, LocalDate.parse("2020-11-11"), LocalDate.parse("2020-11-15"), LocalTime.parse("18:00"), LocalTime.parse("20:00"), 10, "descr", true, "no obs", 3, "someUser", "ticket info", null, null, null, null);
        Event event2 = new Event("Tile2", "Subtitle2", true, LocalDate.parse("2020-11-14"), LocalDate.parse("2020-11-19"), LocalTime.parse("10:00"), LocalTime.parse("12:00"), 12, "descr2", true, "no obs", 3, "someUser", "ticket info", null, null, null, null);
        Location location1 = new Location("Campus", "Obs 23", (float) 34.55, (float) 55.76, null, null);
        Location location2 = new Location("Centru", "Ferdinand 45", (float) 44.6, (float) 99.0, null, null);
        Sublocation sublocation1 = new Sublocation("same", 15, location1, null);
        Sublocation sublocation2 = new Sublocation("sameCentru", 20, location2, null);
        eventRepository.save(event1);
        eventRepository.save(event2);
        locationRepository.save(location1);
        locationRepository.save(location2);
        sublocationRepository.save(sublocation1);
        sublocationRepository.save(sublocation2);

        EventSublocation eventSublocation1 = new EventSublocation(event1, sublocation1);
        EventSublocationID eventSublocationID1 = new EventSublocationID(event1.getId(), sublocation1.getId());
        eventSublocation1.setEventSublocationID(eventSublocationID1);


        EventSublocation eventSublocation2 = new EventSublocation(event2, sublocation2);
        EventSublocationID eventSublocationID2 = new EventSublocationID(event2.getId(), sublocation2.getId());
        eventSublocation2.setEventSublocationID(eventSublocationID2);

        eventSublocationRepository.save(eventSublocation1);
        eventSublocationRepository.save(eventSublocation2);

        Booking booking11 = new Booking(LocalDateTime.now(), "someUser", event1, null);
        Booking booking12 = new Booking(LocalDateTime.now(), "otherUser", event2, null);

        Ticket ticket111 = new Ticket("Andrei", "email@yahoo.com", booking11, null, null);
        Ticket ticket112 = new Ticket("Ioana", "ioa@yahoo.com", booking11, null, null);
        Ticket ticket121 = new Ticket("Maria", "ma@yahoo.com", booking12, null, null);

        bookingRepository.save(booking11);
        bookingRepository.save(booking12);
        ticketRepository.save(ticket111);
        ticketRepository.save(ticket112);
        ticketRepository.save(ticket121);

        Pageable pageable = PageRequest.of(0, 10);

        List<EventView> eventViews = eventService.filter(pageable, null, null, null, null, null, null, null, null, null, ComparisonSign.GREATER, (float) 0, null, null, null, null, null).getContent();
        for (EventView eventView : eventViews) {
            if (eventView.getRate() == 0) {
                assert (false);
            }
        }

        LocalDate startDate = LocalDate.parse("2020-11-16");
        LocalDate endDate = LocalDate.parse("2020-11-30");
        List<EventView> eventViews1 = eventService.filter(pageable, null, null, null, null, null, startDate, endDate, null, null, null, null, null, null, null, null, null).getContent();
        for (EventView eventView : eventViews1) {
            if ((eventView.getStartDate().isBefore(startDate) && eventView.getEndDate().isBefore(startDate)) || (eventView.getStartDate().isAfter(endDate) && eventView.getEndDate().isAfter(endDate))) {
                assert (false);
            }
        }
    }

}
