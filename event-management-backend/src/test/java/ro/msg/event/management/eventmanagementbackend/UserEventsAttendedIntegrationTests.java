package ro.msg.event.management.eventmanagementbackend;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;
import ro.msg.event.management.eventmanagementbackend.entity.Booking;
import ro.msg.event.management.eventmanagementbackend.entity.Event;
import ro.msg.event.management.eventmanagementbackend.repository.BookingRepository;
import ro.msg.event.management.eventmanagementbackend.repository.EventRepository;
import ro.msg.event.management.eventmanagementbackend.security.User;
import ro.msg.event.management.eventmanagementbackend.service.EventService;


@SpringBootTest
@Transactional
@ActiveProfiles("test")
class UserEventsAttendedIntegrationTests {

    @Autowired
    EventService eventService;

    @Autowired
    EventRepository eventRepository;

    @Autowired
    BookingRepository bookingRepository;

    @Test
    void getEvent_thatUserJoined() {
        User user = new User("user@yahoo.com","user","fUser","lUser","user","ROLE_USER");

        Event event = new Event("title", "subtitle", true,  LocalDate.parse("2020-08-23"), LocalDate.parse("2020-08-24"), LocalTime.parse("18:00"), LocalTime.parse("20:00"), 100, "desc", false, "obs", 10, "creator","ticket info", null, null, null, null);
        eventRepository.save(event);

        Booking bookingUser = new Booking(LocalDateTime.of(2019, 8, 17, 3, 35), "user", event, null);
        bookingRepository.save(bookingUser);

        List<Booking> bookingList = new ArrayList<>();
        bookingList.add(bookingUser);
        event.setBookings(bookingList);

        Pageable pageable = PageRequest.of(0, 1);

        Page<Event> eventPage = eventService.filterAndPaginateEventsAttendedByUser(user,pageable);

        assertThat(eventPage.getTotalElements()).isEqualTo(1);
        assertThat(eventPage.getContent().get(0).getTitle()).isEqualTo(event.getTitle());
        assertThat(eventPage.getTotalPages()).isEqualTo(1);
        assertThat(eventPage.isLast()).isTrue();
    }

    @Test
    void getPastEvents_thatUserJoined(){
        User user = new User("user@yahoo.com","user","fUser","lUser","user","ROLE_USER");

        Event eventAttendedByUser = new Event("title", "subtitle", true,  LocalDate.parse("2020-08-23"), LocalDate.parse("2020-08-24"), LocalTime.parse("18:00"), LocalTime.parse("20:00"), 100, "desc", false, "obs", 10, "creator","ticket info", null, null, null, null);
        eventRepository.save(eventAttendedByUser);

        Event eventAttendedByUser2 = new Event("title2", "subtitle2", true,  LocalDate.parse("2020-08-24"), LocalDate.parse("2020-07-24"), LocalTime.parse("18:00"), LocalTime.parse("20:00"), 100, "desc", false, "obs", 10, "creator","ticket info", null, null, null, null);
        eventRepository.save(eventAttendedByUser2);

        Event eventNotAttended = new Event("title3", "subtitle3", true,  LocalDate.parse("2020-08-23"), LocalDate.parse("2020-07-24"), LocalTime.parse("18:00"), LocalTime.parse("20:00"), 100, "desc", false, "obs", 10, "creator","ticket info", null, null, null, null);
        eventRepository.save(eventNotAttended);

        Booking bookingUser = new Booking(LocalDateTime.of(2019, 8, 17, 3, 35), "user", eventAttendedByUser, null);
        bookingRepository.save(bookingUser);

        Booking bookingSameUser = new Booking(LocalDateTime.of(2019, 8, 17, 3, 35), "user", eventAttendedByUser2, null);
        bookingRepository.save(bookingSameUser);

        Booking bookingAnotherUser = new Booking(LocalDateTime.of(2019, 8, 17, 3, 35), "anotherUser", eventNotAttended, null);
        bookingRepository.save(bookingSameUser);

        List<Booking> bookingListEvent1 = new ArrayList<>();
        bookingListEvent1.add(bookingUser);
        eventAttendedByUser.setBookings(bookingListEvent1);

        List<Booking> bookingListEvent2 = new ArrayList<>();
        bookingListEvent2.add(bookingSameUser);
        eventAttendedByUser2.setBookings(bookingListEvent2);

        List<Booking> bookingListEvent3 = new ArrayList<>();
        bookingListEvent3.add(bookingAnotherUser);
        eventNotAttended.setBookings(bookingListEvent3);

        Pageable pageable = PageRequest.of(0, 3);

        Page<Event> eventPage = eventService.filterAndPaginateEventsAttendedByUser(user,pageable);

        assertThat(eventPage.getTotalElements()).isEqualTo(2);
        assertThat(eventPage.isLast()).isTrue();
    }

    @Test
    void getPastEvents_UserHasNoBookings(){
        User user = new User("user@yahoo.com","user","fUser","lUser","user","ROLE_USER");

        Event eventAttendedByUser = new Event("title", "subtitle", true,  LocalDate.parse("2020-08-20"), LocalDate.parse("2020-08-24"), LocalTime.parse("18:00"), LocalTime.parse("20:00"), 100, "desc", false, "obs", 10, "creator","ticket info", null, null, null, null);
        eventRepository.save(eventAttendedByUser);

        Event eventAttendedByUser2 = new Event("title2", "subtitle2", true,  LocalDate.parse("2020-07-23"), LocalDate.parse("2020-07-24"), LocalTime.parse("18:00"), LocalTime.parse("20:00"), 100, "desc", false, "obs", 10, "creator","ticket info", null, null, null, null);
        eventRepository.save(eventAttendedByUser2);

        Booking bookingAnotherUser = new Booking(LocalDateTime.of(2019, 8, 17, 3, 35), "anotherUser", eventAttendedByUser, null);
        bookingRepository.save(bookingAnotherUser);

        Booking bookingAnotherUser2 = new Booking(LocalDateTime.of(2019, 8, 17, 3, 35), "anotherUser", eventAttendedByUser2, null);
        bookingRepository.save(bookingAnotherUser2);

        List<Booking> bookingListEvent1 = new ArrayList<>();
        bookingListEvent1.add(bookingAnotherUser);
        eventAttendedByUser.setBookings(bookingListEvent1);

        List<Booking> bookingListEvent2 = new ArrayList<>();
        bookingListEvent2.add(bookingAnotherUser2);
        eventAttendedByUser2.setBookings(bookingListEvent2);

        Pageable pageable = PageRequest.of(0, 3);

        Page<Event> eventPage = eventService.filterAndPaginateEventsAttendedByUser(user, pageable);

        assertThat(eventPage.getTotalElements()).isZero();
    }

}
