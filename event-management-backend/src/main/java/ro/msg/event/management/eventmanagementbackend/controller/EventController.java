package ro.msg.event.management.eventmanagementbackend.controller;

import java.time.DateTimeException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.NoSuchElementException;
import javax.servlet.http.HttpServletResponse;

import lombok.RequiredArgsConstructor;
import net.minidev.json.JSONObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import ro.msg.event.management.eventmanagementbackend.controller.converter.Converter;
import ro.msg.event.management.eventmanagementbackend.controller.converter.EventReverseConverter;
import ro.msg.event.management.eventmanagementbackend.controller.dto.AvailableTicketsPerCategory;
import ro.msg.event.management.eventmanagementbackend.controller.dto.CardsEventDto;
import ro.msg.event.management.eventmanagementbackend.controller.dto.CardsUserEventDto;
import ro.msg.event.management.eventmanagementbackend.controller.dto.EventDetailsForBookingDto;
import ro.msg.event.management.eventmanagementbackend.controller.dto.EventDetailsForUserDto;
import ro.msg.event.management.eventmanagementbackend.controller.dto.EventDto;
import ro.msg.event.management.eventmanagementbackend.controller.dto.EventFilteringDto;
import ro.msg.event.management.eventmanagementbackend.controller.dto.EventWithRemainingTicketsDto;
import ro.msg.event.management.eventmanagementbackend.entity.Event;
import ro.msg.event.management.eventmanagementbackend.entity.view.EventView;
import ro.msg.event.management.eventmanagementbackend.exception.ExceededCapacityException;
import ro.msg.event.management.eventmanagementbackend.exception.OverlappingEventsException;
import ro.msg.event.management.eventmanagementbackend.exception.TicketCategoryException;
import ro.msg.event.management.eventmanagementbackend.security.User;
import ro.msg.event.management.eventmanagementbackend.service.EventService;
import ro.msg.event.management.eventmanagementbackend.service.TicketService;
import ro.msg.event.management.eventmanagementbackend.utils.ComparisonSign;
import ro.msg.event.management.eventmanagementbackend.utils.SortCriteria;


@RestController
@RequestMapping("/events")
@RequiredArgsConstructor
@CrossOrigin
public class EventController {

    private final EventService eventService;
    private final Converter<Event, EventDto> convertToDto;
    private final Converter<EventDto, Event> convertToEntity;
    private final Converter<EventView, EventFilteringDto> converter;
    private final Converter<EventView, CardsEventDto> converterToCardsEventDto;
    private final Converter<EventView, CardsUserEventDto> converterToUserCardsEventDto;
    private final Converter<Event, CardsEventDto> converterToCardEventDto;
    private final TicketService ticketService;
    private final Converter<Event, EventDetailsForBookingDto> eventDetailsForBookingDtoConverter;

    private static final LocalDate MAX_DATE = LocalDate.parse("2999-12-31");
    private static final LocalDate MIN_DATE = LocalDate.parse("1900-01-01");

    @RequestMapping(value = "/**/{[path:[^\\.]*}",method = RequestMethod.OPTIONS)
    public ResponseEntity options(HttpServletResponse response) {
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<Object> getEvent(@PathVariable long id, @RequestParam(defaultValue = "") String type) {
        try {
            Event event = this.eventService.getEvent(id);
            switch (type) {
                case ("userEventDetails"):
                    EventDto eventDtoForUserEventDetails = convertToDto.convert(event);
                    EventDetailsForUserDto eventDetailsForUserDto = EventDetailsForUserDto.builder()
                            .eventDto(eventDtoForUserEventDetails)
                            .locationAddress(event.getEventSublocations().get(0).getSublocation().getLocation().getAddress())
                            .locationName(event.getEventSublocations().get(0).getSublocation().getLocation().getName())
                            .build();
                    return new ResponseEntity<>(eventDetailsForUserDto, HttpStatus.OK);
                case ("bookingEventDetails"):
                    EventDetailsForBookingDto eventDetailsForBookingDto = this.eventDetailsForBookingDtoConverter.convert(event);
                    return new ResponseEntity<>(eventDetailsForBookingDto, HttpStatus.OK);
                default:
                    EventDto eventDto = convertToDto.convert(event);
                    List<AvailableTicketsPerCategory> availableTicketsPerCategories = ticketService.getAvailableTickets(id);
                    EventWithRemainingTicketsDto eventWithRemainingTicketsDto = EventWithRemainingTicketsDto.builder()
                            .eventDto(eventDto)
                            .availableTicketsPerCategoryList(availableTicketsPerCategories)
                            .build();
                    return new ResponseEntity<>(eventWithRemainingTicketsDto, HttpStatus.OK);
            }
        } catch (NoSuchElementException noSuchElementException) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, noSuchElementException.getMessage(), noSuchElementException);
        }
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<EventDto> saveEvent(@RequestBody EventDto eventDTO) {
        try {

            long locationId = eventDTO.getLocation();

            Event event = ((EventReverseConverter) convertToEntity).convertForUpdate(eventDTO, false);

            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            User user = (User) auth.getPrincipal();
            String creator = user.getIdentificationString();

            event.setCreator(creator);

            Event savedEvent = eventService.saveEvent(event, locationId);

            return new ResponseEntity<>(convertToDto.convert(savedEvent), HttpStatus.OK);
        } catch (OverlappingEventsException | ExceededCapacityException overlappingEventsException) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, overlappingEventsException.getMessage(), overlappingEventsException);
        } catch (DateTimeException dateTimeException) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, dateTimeException.getMessage(), dateTimeException);
        } catch (TicketCategoryException ticketCategoryException) {
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, ticketCategoryException.getMessage(), ticketCategoryException);
        }
    }


    @GetMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<JSONObject> getPaginatedFilteredAndSortedEvents(Pageable pageable, @RequestParam(required = false) String title, @RequestParam(required = false) String subtitle, @RequestParam(required = false) Boolean status, @RequestParam(required = false) Boolean highlighted, @RequestParam(required = false) String location,
                                                                          @RequestParam(required = false) String startDate, @RequestParam(required = false) String endDate, @RequestParam(required = false) String startHour, @RequestParam(required = false) String endHour, @RequestParam(required = false) ComparisonSign rateSign,
                                                                          @RequestParam(required = false) Float rate, @RequestParam(required = false) ComparisonSign maxPeopleSign, @RequestParam(required = false) Integer maxPeople, @RequestParam(required = false) SortCriteria sortCriteria, @RequestParam(required = false) Boolean sortType) {
        try {
            if (startDate != null && endDate == null){
                endDate = MAX_DATE.toString();
            }else if (startDate == null && endDate != null){
                startDate = MIN_DATE.toString();
            }
            Page<EventView> page = eventService.filter(pageable, title, subtitle, status, highlighted, location, startDate != null ? LocalDate.parse(startDate) : null, endDate != null ? LocalDate.parse(endDate) : null, startHour != null ? LocalTime.parse(startHour) : null, endHour != null ? LocalTime.parse(endHour) : null, rateSign, rate, maxPeopleSign, maxPeople, sortCriteria, sortType, null);
            JSONObject responseBody = new JSONObject();
            responseBody.put("events", converter.convertAll(page.getContent()));
            responseBody.put("noPages", page.getTotalPages());
            responseBody.put("more", !page.isLast());
            return new ResponseEntity<>(responseBody, HttpStatus.OK);
        } catch (IndexOutOfBoundsException indexOutOfBoundsException) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, indexOutOfBoundsException.getMessage(), indexOutOfBoundsException);
        }

    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<EventDto> updateEvent(@PathVariable Long id, @RequestBody EventDto eventUpdateDto) {
        EventDto eventDto;
        Event eventUpdated;

        Event event = ((EventReverseConverter) convertToEntity).convertForUpdate(eventUpdateDto, true);
        event.setId(id);

        try {
            List<Long> ticketCategoryToDelete = eventUpdateDto.getTicketCategoryToDelete();
            eventUpdated = eventService.updateEvent(event, ticketCategoryToDelete, eventUpdateDto.getLocation());
            eventDto = convertToDto.convert(eventUpdated);
        } catch (NoSuchElementException noSuchElementException) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, noSuchElementException.getMessage(), noSuchElementException);
        } catch (OverlappingEventsException | ExceededCapacityException overlappingEventsException) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, overlappingEventsException.getMessage(), overlappingEventsException);
        } catch (DateTimeException dateTimeException) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, dateTimeException.getMessage(), dateTimeException);
        } catch (TicketCategoryException ticketCategoryException) {
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, ticketCategoryException.getMessage(), ticketCategoryException);
        }
        return new ResponseEntity<>(eventDto, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<String> deleteEvent(@PathVariable long id) {

        try {
            this.eventService.deleteEvent(id);
            return new ResponseEntity<>("Event deleted", HttpStatus.OK);
        } catch (NoSuchElementException noSuchElementException) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, noSuchElementException.getMessage(), noSuchElementException);
        }
    }

    @GetMapping("/latest")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<JSONObject> chronologicalPaginatedEvents(Pageable pageable) {
        try {
            Page<EventView> page = eventService.filter(pageable, null, null, null, null, null, LocalDate.now(), MAX_DATE, null, null, null, null, null, null, SortCriteria.DATE, true, null);
            JSONObject responseBody = new JSONObject();
            responseBody.put("events", converter.convertAll(page.getContent()));
            responseBody.put("noPages", page.getTotalPages());
            responseBody.put("more", !page.isLast());
            return new ResponseEntity<>(responseBody, HttpStatus.OK);
        } catch (IndexOutOfBoundsException indexOutOfBoundsException) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, indexOutOfBoundsException.getMessage(), indexOutOfBoundsException);
        }
    }

    @GetMapping("/upcoming")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<CardsEventDto>> upcomingEvents(@PageableDefault(size = 4) Pageable pageable) {
        try {

            Page<EventView> page = eventService.filter(pageable, null, null, null, null, null, LocalDate.now(), MAX_DATE, null, null, null, null, null, null, SortCriteria.DATE, true, null);
            return new ResponseEntity<>(converterToCardsEventDto.convertAll(page.getContent()), HttpStatus.OK);
        } catch (IndexOutOfBoundsException indexOutOfBoundsException) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, indexOutOfBoundsException.getMessage(), indexOutOfBoundsException);
        }
    }

    @GetMapping("/history")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<CardsEventDto>> historyEvents(@PageableDefault(size = 4) Pageable pageable) {
        try {
            Page<EventView> page = eventService.filter(pageable, null, null, null, null, null, MIN_DATE, LocalDate.now(), null, null, null, null, null, null, SortCriteria.DATE, false, null);
            return new ResponseEntity<>(converterToCardsEventDto.convertAll(page.getContent()), HttpStatus.OK);
        } catch (IndexOutOfBoundsException indexOutOfBoundsException) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, indexOutOfBoundsException.getMessage(), indexOutOfBoundsException);
        }
    }

    @GetMapping("/user/upcoming")
    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    public ResponseEntity<JSONObject> userUpcomingEvents(Pageable pageable,
                                                         @RequestParam(required = false) String title,
                                                         @RequestParam(required = false) List<String> multipleLocations,
                                                         @RequestParam(required = false) ComparisonSign rateSign,
                                                         @RequestParam(required = false) Float rate) {
        Page<EventView> eventViews = eventService.filterEventsByEndDate(pageable,title,multipleLocations,rateSign,rate,LocalDate.now(),(short)1);
        return getUserCardsResponseEntity(eventViews);
    }

    @GetMapping("/user/history")
    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    public ResponseEntity<JSONObject> userPastEvents(Pageable pageable,
                                                     @RequestParam(required = false) String title,
                                                     @RequestParam(required = false) List<String> multipleLocations,
                                                     @RequestParam(required = false) ComparisonSign rateSign,
                                                     @RequestParam(required = false) Float rate) {
        Page<EventView> eventViews = eventService.filterEventsByEndDate(pageable,title,multipleLocations,rateSign,rate,LocalDate.now(),(short)0);
        return getUserCardsResponseEntity(eventViews);
    }

    private ResponseEntity<JSONObject> getUserCardsResponseEntity(Page<EventView> eventViews) {
        List<CardsUserEventDto> returnList = converterToUserCardsEventDto.convertAll(eventViews.getContent());

        boolean more = !eventViews.isLast();
        JSONObject responseBody = new JSONObject();
        responseBody.put("events", returnList);
        responseBody.put("more", more);
        return new ResponseEntity<>(responseBody, HttpStatus.OK);
    }

    @GetMapping("/user/past")
    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    public ResponseEntity<JSONObject> userEventsAttended(Pageable pageable) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();

        Page<Event> pageEvent = eventService.filterAndPaginateEventsAttendedByUser(user, pageable);
        List<Event> events = pageEvent.getContent();
        List<CardsEventDto> eventsDto = converterToCardEventDto.convertAll(events);

        JSONObject responseBody = new JSONObject();
        responseBody.put("events", eventsDto);
        responseBody.put("noPages", pageEvent.getTotalPages());
        responseBody.put("more", !pageEvent.isLast());

        return new ResponseEntity<>(responseBody, HttpStatus.OK);
    }

    @GetMapping("/user/future")
    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    public ResponseEntity<JSONObject> userEventsWillAttend(Pageable pageable) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();

        Page<Event> pageEvent = eventService.filterAndPaginateEventsUserWillAttend(user, pageable);
        List<Event> events = pageEvent.getContent();
        List<CardsEventDto> eventsDto = converterToCardEventDto.convertAll(events);

        JSONObject responseBody = new JSONObject();
        responseBody.put("events", eventsDto);
        responseBody.put("noPages", pageEvent.getTotalPages());
        responseBody.put("more", !pageEvent.isLast());

        return  new ResponseEntity<>(responseBody, HttpStatus.OK);
    }

    @GetMapping("/highlighted")
    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    public ResponseEntity<List<CardsUserEventDto>> getHighlightedEvents(@PageableDefault(size = Integer.MAX_VALUE) Pageable pageable) {

        Page<EventView> eventViews = eventService.filter(pageable, null, null, null, true, null, LocalDate.now(), MAX_DATE, null, null, null, null, null, null, SortCriteria.DATE, false, null);

        List<CardsUserEventDto> returnList = converterToUserCardsEventDto.convertAll(eventViews.getContent());

        return new ResponseEntity<>(returnList, HttpStatus.OK);
    }
}

