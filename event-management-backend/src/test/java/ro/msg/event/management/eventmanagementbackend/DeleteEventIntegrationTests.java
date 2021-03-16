package ro.msg.event.management.eventmanagementbackend;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.NoSuchElementException;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import ro.msg.event.management.eventmanagementbackend.entity.Event;
import ro.msg.event.management.eventmanagementbackend.repository.EventRepository;
import ro.msg.event.management.eventmanagementbackend.service.EventService;

@SpringBootTest
@ActiveProfiles("test")
class DeleteEventIntegrationTests {
    private final EventService eventService;
    private final EventRepository eventRepository;

    @Autowired
    public DeleteEventIntegrationTests(EventService eventService, EventRepository eventRepository) {
        this.eventService = eventService;
        this.eventRepository = eventRepository;
    }

    @Test
    void deleteEvent_existingEvent_eventDeleted() {
        Event event1 = new Event();
        event1.setTitle("event1");
        Event event2 = new Event();
        event2.setTitle("event2");

        this.eventRepository.save(event1);
        this.eventRepository.save(event2);

        long beforeCount = this.eventRepository.count();

        this.eventService.deleteEvent(1);

        assertThat(this.eventRepository.count()).isEqualTo(beforeCount - 1);
    }

    @Test
    void deleteEvent_noEventWithSuchId_exceptionThrown() {
        Event event1 = new Event();
        event1.setTitle("event1");
        Event event2 = new Event();
        event2.setTitle("event2");

        this.eventRepository.save(event1);
        this.eventRepository.save(event2);

        assertThrows(NoSuchElementException.class,
                () -> this.eventService.deleteEvent(-1));
        assertThrows(NoSuchElementException.class,
                () -> this.eventService.deleteEvent(1000));
    }
}
