package ro.msg.event.management.eventmanagementbackend;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import ro.msg.event.management.eventmanagementbackend.entity.Booking;
import ro.msg.event.management.eventmanagementbackend.entity.Event;
import ro.msg.event.management.eventmanagementbackend.entity.EventSublocation;
import ro.msg.event.management.eventmanagementbackend.entity.EventSublocationID;
import ro.msg.event.management.eventmanagementbackend.entity.Location;
import ro.msg.event.management.eventmanagementbackend.entity.Picture;
import ro.msg.event.management.eventmanagementbackend.entity.Sublocation;
import ro.msg.event.management.eventmanagementbackend.entity.Ticket;
import ro.msg.event.management.eventmanagementbackend.entity.TicketCategory;
import ro.msg.event.management.eventmanagementbackend.exception.ExceededCapacityException;
import ro.msg.event.management.eventmanagementbackend.exception.OverlappingEventsException;
import ro.msg.event.management.eventmanagementbackend.repository.BookingRepository;
import ro.msg.event.management.eventmanagementbackend.repository.EventRepository;
import ro.msg.event.management.eventmanagementbackend.repository.EventSublocationRepository;
import ro.msg.event.management.eventmanagementbackend.repository.LocationRepository;
import ro.msg.event.management.eventmanagementbackend.repository.PictureRepository;
import ro.msg.event.management.eventmanagementbackend.repository.SublocationRepository;
import ro.msg.event.management.eventmanagementbackend.repository.TicketCategoryRepository;
import ro.msg.event.management.eventmanagementbackend.repository.TicketRepository;
import ro.msg.event.management.eventmanagementbackend.service.EventService;

@SpringBootTest
@ActiveProfiles("test")
class UpdateEventIntegrationTests {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private LocationRepository locationRepository;

    @Autowired
    private SublocationRepository sublocationRepository;

    @Autowired
    private EventSublocationRepository eventSublocationRepository;

    @Autowired
    private PictureRepository pictureRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private TicketCategoryRepository ticketCategoryRepository;

    @Autowired
    private EventService eventService;


    @Test
    void updateEvent_thenReturnOk() {
        Event event = new Event("title", "subtitle", true, LocalDate.parse("2020-02-15"), LocalDate.parse("2025-02-15"),
                                LocalTime.parse("18:00"), LocalTime.parse("20:00"), 100, "desc", false, "obs", 10,
                                "creator", "ticket info", null, null, null, null);
        Location location = new Location("nameLocation", "address", (float) 3.4, (float) 4.5, null, null);
        Sublocation sublocation = new Sublocation("subLocName", 100, location, null);
        eventRepository.save(event);

        locationRepository.save(location);
        sublocationRepository.save(sublocation);

        EventSublocationID eventSublocationID = new EventSublocationID(event.getId(), location.getId());
        EventSublocation eventSublocation = new EventSublocation(event, sublocation);
        eventSublocation.setEventSublocationID(eventSublocationID);
        eventSublocationRepository.save(eventSublocation);

        Picture picture = new Picture("img_url", event);
        pictureRepository.save(picture);


        Booking booking = new Booking(LocalDateTime.of(2020, 8, 17, 3, 35), "user", event, null);
        bookingRepository.save(booking);

        TicketCategory ticketCategory = new TicketCategory("title", "subtitle", (float) 40, "desc", 3, true, event,
                                                           null);
        ticketCategoryRepository.save(ticketCategory);

        Ticket ticket = new Ticket("name", "address@yahoo.com", booking, ticketCategory, null);
        ticketRepository.save(ticket);

        TicketCategory ticketCategoryToUpdate = new TicketCategory("NewTitleCategory", "subtitle", (float) 40, "desc",
                                                                   3, true, event, null);
        ticketCategoryToUpdate.setId(ticketCategory.getId());
        List<TicketCategory> ticketCategoryList = new ArrayList<>();
        ticketCategoryList.add(ticketCategoryToUpdate);

        Event eventToUpdate = new Event("newTitle", "newSubtitle", true, LocalDate.parse("2020-02-15"),
                                        LocalDate.parse("2025-03-16"), LocalTime.parse("18:00"),
                                        LocalTime.parse("20:00"), 100, "desc", false, "obs", 10, "creator",
                                        "ticket info", null, null, null, ticketCategoryList);
        eventToUpdate.setId(event.getId());

        Picture pictureToUpdate = new Picture("NewImg_url", eventToUpdate);
        List<Picture> pictures = new ArrayList<>();
        pictures.add(pictureToUpdate);
        eventToUpdate.setPictures(pictures);

        List<String> picturesToDelete = new ArrayList<>();
        try {
            eventService.updateEvent(eventToUpdate, new ArrayList<>(),
                                     this.locationRepository.findById(this.locationRepository.findAll().get(0).getId())
                                                            .get().getId());
            Optional<Event> eventOptional = eventRepository.findById(event.getId());
            eventOptional.ifPresent(value -> assertThat(value.getTitle()).isEqualTo(eventToUpdate.getTitle()));
            eventOptional.ifPresent(value -> assertThat(value.getSubtitle()).isEqualTo(eventToUpdate.getSubtitle()));
            eventOptional.ifPresent(value -> assertThat(value.getMaxPeople()).isEqualTo(eventToUpdate.getMaxPeople()));
        } catch (ExceededCapacityException | OverlappingEventsException exception) {
            assert false;
        }
    }
}
