package ro.msg.event_management.controller;

import java.io.*;
import java.text.SimpleDateFormat;
import java.time.DateTimeException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;
import javax.servlet.http.HttpServletResponse;

import lombok.RequiredArgsConstructor;
import net.minidev.json.JSONObject;
import org.springframework.core.io.InputStreamResource;
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
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import ro.msg.event_management.controller.converter.Converter;
import ro.msg.event_management.controller.converter.EventReverseConverter;
import ro.msg.event_management.controller.dto.AvailableTicketsPerCategory;
import ro.msg.event_management.controller.dto.CardsEventDto;
import ro.msg.event_management.controller.dto.CardsUserEventDto;
import ro.msg.event_management.controller.dto.EventDetailsForBookingDto;
import ro.msg.event_management.controller.dto.EventDetailsForUserDto;
import ro.msg.event_management.controller.dto.EventDto;
import ro.msg.event_management.controller.dto.EventFilteringDto;
import ro.msg.event_management.controller.dto.EventWithRemainingTicketsDto;
import ro.msg.event_management.entity.*;
import ro.msg.event_management.entity.view.EventView;
import ro.msg.event_management.exception.ExceededCapacityException;
import ro.msg.event_management.exception.OverlappingEventsException;
import ro.msg.event_management.exception.TicketCategoryException;
import ro.msg.event_management.security.User;
import ro.msg.event_management.service.*;
import ro.msg.event_management.utils.ComparisonSign;
import ro.msg.event_management.utils.SortCriteria;


@RestController
@RequestMapping("/events")
@RequiredArgsConstructor
@CrossOrigin
public class EventController {

    private final EventService eventService;
    private final PictureService pictureService;
    private final EventSublocationService sublocationService;
    private final BookingService bookingService;
    private final TicketCategoryService categoryService;
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

    @PostMapping(value = "/import")
    //@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public void exportEventsCsv(@RequestBody MultipartFile csv) throws IOException, OverlappingEventsException, ExceededCapacityException {
        InputStream inputStream = csv.getInputStream();

        var reader = new BufferedReader(new InputStreamReader(inputStream));

        reader.readLine(); // skip header

        while(reader.ready()){
            String line = reader.readLine();
            var fields = line.split(",");

            var title = fields[0];
            var subtitle = fields[1];
            var status = fields[2];
            var startDate = fields[3];
            var endDate = fields[4];
            var endHour = fields[5];
            var startHour = fields[6];
            var maxPeople = fields[7];
            var description = fields[8];
            var highlighted = fields[9];
            var observations = fields[10];
            var ticketsPerUser = fields[11];
            var creator = fields[12];
            var ticketInfo = fields[13];

            var picturesIds = fields[14];
            var locationId = fields[15];

            var ids1 = picturesIds.split(";");
            var pictureList = new ArrayList<Picture>();
            for(String id: ids1){
                if(!id.equals("")) {
                    pictureList.add(pictureService.findOne(Long.parseLong(id)));
                }
            }

            var sublocationIds = fields[15];
            var ids2 = sublocationIds.split(";");
            var sublocationList = new ArrayList<EventSublocation>();
            for(String id: ids2){
                if(!id.equals("")) {
                    sublocationList.add(sublocationService.findOne(Long.parseLong(id)));
                }
            }

            var bookingsIds = fields[16];
            var ids3 = bookingsIds.split(";");
            var bookingsList = new ArrayList<Booking>();
            for(String id: ids3){
                if(!id.equals("")) {
                    bookingsList.add(bookingService.findOne(Long.parseLong(id)));
                }
            }

            var categoryIds = fields[17];
            var ids4 = categoryIds.split(";");
            var categoryList = new ArrayList<TicketCategory>();
            for(String id: ids4){
                if(!id.equals("")){
                    categoryList.add(categoryService.findOne(Long.parseLong(id)));
                }
            }

            var event = new Event();
            if(title.equals("")) {
                continue;
            }
            event.setTitle(title);

            if(subtitle.equals("")) {
                continue;
            }
            event.setSubtitle(subtitle);

            if(status.equals("")) {
                continue;
            }
            event.setStatus(Boolean.parseBoolean(status));

            if(startDate.equals("")) {
                continue;
            }
            event.setStartDate(LocalDate.parse(startDate));

            if(endDate.equals("")) {
                continue;
            }
            event.setEndDate(LocalDate.parse(endDate));

            if(endHour.equals("")) {
                continue;
            }
            event.setEndHour(LocalTime.parse(endHour));

            if(startHour.equals("")) {
                continue;
            }
            event.setStartHour(LocalTime.parse(startHour));

            if(maxPeople.equals("")) {
                continue;
            }
            event.setMaxPeople(Integer.parseInt(maxPeople));

            if(description.equals("")) {
                continue;
            }
            event.setDescription(description);

            if(highlighted.equals("")) {
                continue;
            }
            event.setHighlighted(Boolean.parseBoolean(highlighted));

            if(observations.equals("")) {
                continue;
            }
            event.setObservations(observations);

            if(ticketsPerUser.equals("")) {
                continue;
            }
            event.setTicketsPerUser(Integer.parseInt(ticketsPerUser));

            if(creator.equals("")) {
                continue;
            }
            event.setCreator(creator);

            if(ticketInfo.equals("")) {
                continue;
            }
            event.setTicketInfo(ticketInfo);

            event.setPictures(pictureList);
            event.setEventSublocations(sublocationList);
            event.setBookings(bookingsList);
            event.setTicketCategories(categoryList);

            int x=4;
            if(locationId.equals("")){
                continue;
            }

            eventService.saveEvent(event, Long.parseLong(locationId));
        }
    }

    @GetMapping(value = "/export", produces = "text/csv")
    //@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<InputStreamResource> getEventsCsv() throws FileNotFoundException {
        var events = eventService.findAll();

        var headers = new ArrayList<String>();
        headers.add("title");
        headers.add("subtitle");
        headers.add("status");
        headers.add("startDate");
        headers.add("endDate");
        headers.add("endHour");
        headers.add("startHour");
        headers.add("maxPeople");
        headers.add("description");
        headers.add("highlighted");
        headers.add("observations");
        headers.add("ticketsPerUser");
        headers.add("creator");
        headers.add("ticketInfo");
        headers.add("picturesIds");
        headers.add("eventSublocationIds");
        headers.add("bookingsIds");
        headers.add("ticketCategoriesIds");

        var date = new SimpleDateFormat("yyyy-MM-dd-hh-mm-ss").format(new Date());
        var filename = "EventCSV" + date + ".csv";

        try {
            var writer = new FileWriter(filename);
            for(String s:headers){
                writer.write(s);
                writer.write(',');
            }

            writer.write("\n");
            for(Event event: events){
                writer.write(event.getTitle());
                writer.write(',');

                writer.write(event.getSubtitle());
                writer.write(',');

                writer.write(String.valueOf(event.isStatus()));
                writer.write(',');

                writer.write(event.getStartDate().toString());
                writer.write(',');

                writer.write(event.getEndDate().toString());
                writer.write(',');

                writer.write(event.getEndHour().toString());
                writer.write(',');

                writer.write(event.getStartHour().toString());
                writer.write(',');

                writer.write(Integer.valueOf(event.getMaxPeople()).toString());
                writer.write(',');

                writer.write(event.getDescription());
                writer.write(',');

                writer.write(String.valueOf(event.isHighlighted()));
                writer.write(',');

                writer.write(event.getObservations());
                writer.write(',');

                writer.write(Integer.valueOf(event.getTicketsPerUser()).toString());
                writer.write(',');

                writer.write(event.getCreator());
                writer.write(',');

                writer.write(event.getTicketInfo());
                writer.write(',');

                var pictures = event.getPictures();
                for(Picture picture: pictures){
                    writer.write(String.valueOf(picture.getId()));
                    writer.write(';');
                }
                writer.write(',');

                var sublocations = event.getEventSublocations();
                for(EventSublocation sublocation: sublocations){
                    writer.write(String.valueOf(sublocation.getEventSublocationID().getSublocation()));
                    writer.write(';');
                }
                writer.write(',');

                var bookings = event.getBookings();
                for(Booking booking: bookings){
                    writer.write(String.valueOf(booking.getId()));
                    writer.write(';');
                }
                writer.write(',');

                var categories = event.getTicketCategories();
                for(TicketCategory category: categories){
                    writer.write(String.valueOf(category.getId()));
                    writer.write(';');
                }
                writer.write(',');
                writer.write('\n');

            }
            writer.close();

        } catch (IOException e){
            e.printStackTrace();
        }

        return new ResponseEntity<>(new InputStreamResource(new FileInputStream(filename)), HttpStatus.OK);
    }
}

