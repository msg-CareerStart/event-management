package ro.msg.event.management.eventmanagementbackend;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import javax.transaction.Transactional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import ro.msg.event.management.eventmanagementbackend.controller.dto.AvailableTicketsPerCategory;
import ro.msg.event.management.eventmanagementbackend.entity.Booking;
import ro.msg.event.management.eventmanagementbackend.entity.Event;
import ro.msg.event.management.eventmanagementbackend.entity.EventSublocation;
import ro.msg.event.management.eventmanagementbackend.entity.EventSublocationID;
import ro.msg.event.management.eventmanagementbackend.entity.Location;
import ro.msg.event.management.eventmanagementbackend.entity.Sublocation;
import ro.msg.event.management.eventmanagementbackend.entity.Ticket;
import ro.msg.event.management.eventmanagementbackend.entity.TicketCategory;
import ro.msg.event.management.eventmanagementbackend.repository.BookingRepository;
import ro.msg.event.management.eventmanagementbackend.repository.EventRepository;
import ro.msg.event.management.eventmanagementbackend.repository.EventSublocationRepository;
import ro.msg.event.management.eventmanagementbackend.repository.LocationRepository;
import ro.msg.event.management.eventmanagementbackend.repository.SublocationRepository;
import ro.msg.event.management.eventmanagementbackend.repository.TicketCategoryRepository;
import ro.msg.event.management.eventmanagementbackend.repository.TicketRepository;
import ro.msg.event.management.eventmanagementbackend.service.EventService;
import ro.msg.event.management.eventmanagementbackend.service.TicketService;

@SpringBootTest
@Transactional
@ActiveProfiles("test")
public class NumberOfAvailableTicketsIntegrationTests {
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

    @Autowired
    private TicketCategoryRepository ticketCategoryRepository;

    @Autowired
    private TicketService ticketService;

    @Test
    public void test_number_ticket_per_category_for_event(){
        Event event1 = new Event("Tile", "Subtitle", true, LocalDate.parse("2020-11-11"), LocalDate.parse("2020-11-15"), LocalTime.parse("18:00"), LocalTime.parse("20:00"), 10, "descr", true, "no obs", 3, "someUser","ticket info", null, null, null,null);
        Event event2 = new Event("Tile2", "Subtitle2", true, LocalDate.parse("2020-11-14"), LocalDate.parse("2020-11-19"), LocalTime.parse("10:00"), LocalTime.parse("12:00"), 12, "descr2", true, "no obs", 3, "someUser", "ticket info", null, null, null,null);
        Location location1 = new Location("Campus", "Obs 23", (float) 34.55, (float) 55.76, null, null);
        Location location2 = new Location("Centru", "Ferdinand 45", (float) 44.6, (float) 99.0, null, null);
        Sublocation sublocation1 = new Sublocation("same", 15, location1, null);
        Sublocation sublocation2 = new Sublocation("sameCentru", 20, location2, null);
        TicketCategory ticketCategory1 = new TicketCategory("VIP","subtitle", (float)10.0, "descr",10,true,event1,null);
        TicketCategory ticketCategory2 = new TicketCategory("Normal","subtitle", (float)5.0, "descr",10,true,event1,null);
        TicketCategory ticketCategory3 = new TicketCategory("Cheap","subtitle", (float)1.0, "descr",10,true,event1,null);
        TicketCategory ticketCategory4 = new TicketCategory("VIP","subtitle", (float)10.0, "descr",10,true,event2,null);
        TicketCategory ticketCategory5 = new TicketCategory("VIP","subtitle", (float)10.0, "descr",10,true,event2,null);
        ticketCategoryRepository.save(ticketCategory1);
        ticketCategoryRepository.save(ticketCategory2);
        ticketCategoryRepository.save(ticketCategory3);
        ticketCategoryRepository.save(ticketCategory4);
        ticketCategoryRepository.save(ticketCategory5);
        List<TicketCategory> ticketCategories = new ArrayList<>(List.of(ticketCategory1,ticketCategory2,ticketCategory3));
        event1.setTicketCategories(ticketCategories);
        eventRepository.save(event1);
        eventRepository.save(event2);
        locationRepository.save(location1);
        locationRepository.save(location2);
        sublocationRepository.save(sublocation1);
        sublocationRepository.save(sublocation2);

        EventSublocation eventSublocation1 = new EventSublocation(event1, sublocation1);
        EventSublocationID eventSublocationID1 = new EventSublocationID(event1.getId(),sublocation1.getId());
        eventSublocation1.setEventSublocationID(eventSublocationID1);


        EventSublocation eventSublocation2 = new EventSublocation(event2, sublocation2);
        EventSublocationID eventSublocationID2 = new EventSublocationID(event2.getId(), sublocation2.getId());
        eventSublocation2.setEventSublocationID(eventSublocationID2);

        eventSublocationRepository.save(eventSublocation1);
        eventSublocationRepository.save(eventSublocation2);

        Booking booking11 = new Booking(LocalDateTime.now(), "someUser", event1, null);
        Booking booking12 = new Booking(LocalDateTime.now(), "otherUser", event2, null);


        Ticket ticket111 = new Ticket("Andrei", "email@yahoo.com", booking11, ticketCategory1,null);
        Ticket ticket112 = new Ticket("Ioana", "ioa@yahoo.com", booking11, ticketCategory1,null);
        Ticket ticket113 = new Ticket("Maria","ma@yahoo.com",booking11,ticketCategory2,null);
        Ticket ticket114 = new Ticket("Maria","ma@yahoo.com",booking11,ticketCategory3,null);
        List<Ticket> tickets = new ArrayList<>(List.of(ticket111,ticket112));
        ticketCategory1.setTickets(tickets);
        ticketCategory2.setTickets(new ArrayList<>(List.of(ticket113)));
        ticketCategory3.setTickets(new ArrayList<>(List.of(ticket114)));
        bookingRepository.save(booking11);
        bookingRepository.save(booking12);
        ticketRepository.save(ticket111);
        ticketRepository.save(ticket112);
        ticketRepository.save(ticket113);
        ticketRepository.save(ticket114);


        long id = event1.getId();
        List<AvailableTicketsPerCategory> list = ticketService.getAvailableTickets(id);
        List<TicketCategory> categories = ticketCategoryRepository.getAllForEvent(id);
        for (AvailableTicketsPerCategory availableTicketsPerCategory: list){
            for (TicketCategory ticketCategory : categories){
                if (availableTicketsPerCategory.getTitle().equals(ticketCategory.getTitle())){
                    assertThat(ticketCategory.getTicketsPerCategory()).isGreaterThan(availableTicketsPerCategory.getRemaining().intValue());
                }
            }
        }

    }



}
