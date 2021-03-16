package ro.msg.event.management.eventmanagementbackend;

import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;
import ro.msg.event.management.eventmanagementbackend.entity.Event;
import ro.msg.event.management.eventmanagementbackend.entity.TicketCategory;
import ro.msg.event.management.eventmanagementbackend.exception.TicketCategoryException;
import ro.msg.event.management.eventmanagementbackend.repository.EventRepository;
import ro.msg.event.management.eventmanagementbackend.repository.TicketCategoryRepository;
import ro.msg.event.management.eventmanagementbackend.service.TicketCategoryService;

@SpringBootTest
@ActiveProfiles("test")
class TicketCategoryCRUDIntegrationsTests {
    private final EventRepository eventRepository;
    private final TicketCategoryService ticketCategoryService;
    private final TicketCategoryRepository ticketCategoryRepository;

    @Autowired
    public TicketCategoryCRUDIntegrationsTests(TicketCategoryService ticketCategoryService, EventRepository eventRepository, TicketCategoryRepository ticketCategoryRepository) {
        this.ticketCategoryService = ticketCategoryService;
        this.eventRepository = eventRepository;
        this.ticketCategoryRepository = ticketCategoryRepository;
    }

    @BeforeEach
    void setUp() {
        this.eventRepository.deleteAll();
        this.eventRepository.deleteAll();
    }

    @Test
    @Transactional
    void saveTicketCategories_validCategories_categoriesSaved() {
        Event event = new Event();
        event.setMaxPeople(40);

        TicketCategory ticketCategory1 = new TicketCategory();
        ticketCategory1.setTicketsPerCategory(10);
        ticketCategory1.setEvent(event);
        TicketCategory ticketCategory2 = new TicketCategory();
        ticketCategory2.setTicketsPerCategory(10);
        ticketCategory2.setEvent(event);

        List<TicketCategory> ticketCategories = new ArrayList<>();
        ticketCategories.add(ticketCategory1);
        ticketCategories.add(ticketCategory2);

        event.setTicketCategories(ticketCategories);
        this.eventRepository.save(event);

        List<TicketCategory> savedCategories = this.ticketCategoryService.saveTicketCategories(ticketCategories, event);

        assert this.ticketCategoryRepository.findAll().size() == 2;
        assert this.eventRepository.findById(this.eventRepository.findAll().get(0).getId()).get().getTicketCategories().size() == 2;
    }

    @Test
    void saveTicketCategories_sumOfTicketsPerCategoryExceedsPeopleAtEvent_exceptionThrown() {
        Event event = new Event();
        event.setMaxPeople(15);

        TicketCategory ticketCategory1 = new TicketCategory();
        ticketCategory1.setTicketsPerCategory(10);
        ticketCategory1.setEvent(event);
        TicketCategory ticketCategory2 = new TicketCategory();
        ticketCategory2.setTicketsPerCategory(10);
        ticketCategory2.setEvent(event);

        List<TicketCategory> ticketCategories = new ArrayList<>();
        ticketCategories.add(ticketCategory1);
        ticketCategories.add(ticketCategory2);

        this.eventRepository.save(event);
        assertThrows(TicketCategoryException.class,
                () -> this.ticketCategoryService.saveTicketCategories(ticketCategories, event));
    }

    @Test
    @Transactional
    void deleteTicketCategory_existingTicketCategory_ticketCategoryDeleted() {
        Event event = new Event();
        event.setMaxPeople(40);

        TicketCategory ticketCategory1 = new TicketCategory();
        ticketCategory1.setTicketsPerCategory(10);
        ticketCategory1.setEvent(event);
        TicketCategory ticketCategory2 = new TicketCategory();
        ticketCategory2.setTicketsPerCategory(10);
        ticketCategory2.setEvent(event);

        List<TicketCategory> ticketCategories = new ArrayList<>();
        ticketCategories.add(ticketCategory1);
        ticketCategories.add(ticketCategory2);

        event.setTicketCategories(ticketCategories);
        this.eventRepository.save(event);

        long countBefore = this.ticketCategoryRepository.count();
        this.ticketCategoryService.deleteTicketCategory(this.ticketCategoryRepository.findAll().get(0).getId());
        assert this.ticketCategoryRepository.count() == countBefore - 1;
        assert this.eventRepository.findById(this.eventRepository.findAll().get(0).getId()).get().getTicketCategories().size() == 1;
    }

    @Test
    void deleteTicketCategory_noTicketCategoryWithSuchId_exceptionThrown() {
        Event event = new Event();
        event.setMaxPeople(40);

        TicketCategory ticketCategory1 = new TicketCategory();
        ticketCategory1.setTicketsPerCategory(10);
        ticketCategory1.setEvent(event);
        TicketCategory ticketCategory2 = new TicketCategory();
        ticketCategory2.setTicketsPerCategory(10);
        ticketCategory2.setEvent(event);

        List<TicketCategory> ticketCategories = new ArrayList<>();
        ticketCategories.add(ticketCategory1);
        ticketCategories.add(ticketCategory2);

        event.setTicketCategories(ticketCategories);
        this.eventRepository.save(event);

        assertThrows(NoSuchElementException.class,
                () -> this.ticketCategoryService.deleteTicketCategory(-2));
        assertThrows(NoSuchElementException.class,
                () -> this.ticketCategoryService.deleteTicketCategory(100));
    }

    @Test
    void updateTicketCategory_validTicketCategory_ticketCategoryUpdated() {
        Event event = new Event();
        event.setMaxPeople(40);

        TicketCategory ticketCategory1 = new TicketCategory();
        ticketCategory1.setTicketsPerCategory(10);
        ticketCategory1.setTitle("not updated");
        ticketCategory1.setEvent(event);

        List<TicketCategory> ticketCategories = new ArrayList<>();
        ticketCategories.add(ticketCategory1);

        event.setTicketCategories(ticketCategories);
        this.eventRepository.save(event);

        long categoryId = this.ticketCategoryRepository.findAll().get(0).getId();
        TicketCategory update = new TicketCategory();
        update.setId(categoryId);
        update.setTicketsPerCategory(33);
        update.setAvailable(true);

        assert this.ticketCategoryRepository.findById(categoryId).get().getTitle().equals("not updated");
        this.ticketCategoryService.updateTicketCategory(update);
        assert this.ticketCategoryRepository.findById(categoryId).get().getTicketsPerCategory() == update.getTicketsPerCategory();
        assert this.ticketCategoryRepository.findById(categoryId).get().isAvailable() == update.isAvailable();
    }

    @Test
    void updateTicketCategory_missingTicketCategory_exceptionThrown() {
        Event event = new Event();
        event.setMaxPeople(40);

        TicketCategory ticketCategory1 = new TicketCategory();
        ticketCategory1.setTicketsPerCategory(10);
        ticketCategory1.setTitle("not updated");
        ticketCategory1.setEvent(event);

        List<TicketCategory> ticketCategories = new ArrayList<>();
        ticketCategories.add(ticketCategory1);

        event.setTicketCategories(ticketCategories);
        this.eventRepository.save(event);

        long categoryId = this.ticketCategoryRepository.findAll().get(0).getId() + 1;
        TicketCategory update = new TicketCategory();
        update.setId(categoryId);
        update.setTitle("updated");

        assertThrows(NoSuchElementException.class,
                () -> this.ticketCategoryService.updateTicketCategory(update));
    }

    @Test
    void updateTicketCategory_sumOfTicketsPerCategoryExceedsPeopleAtEvent_exceptionThrown() {
        Event event = new Event();
        event.setMaxPeople(10);

        TicketCategory ticketCategory1 = new TicketCategory();
        ticketCategory1.setTicketsPerCategory(10);
        ticketCategory1.setTitle("not updated");
        ticketCategory1.setEvent(event);

        List<TicketCategory> ticketCategories = new ArrayList<>();
        ticketCategories.add(ticketCategory1);

        event.setTicketCategories(ticketCategories);
        this.eventRepository.save(event);

        long categoryId = this.ticketCategoryRepository.findAll().get(0).getId();
        TicketCategory update = new TicketCategory();
        update.setId(categoryId);
        update.setTitle("updated");
        update.setTicketsPerCategory(15);

        assertThrows(TicketCategoryException.class,
                () -> this.ticketCategoryService.updateTicketCategory(update));

    }
}
