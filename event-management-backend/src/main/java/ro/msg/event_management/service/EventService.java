package ro.msg.event_management.service;

import java.io.*;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;
import java.util.stream.Collectors;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceContextType;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import ro.msg.event_management.entity.*;
import ro.msg.event_management.entity.view.EventView;
import ro.msg.event_management.exception.ExceededCapacityException;
import ro.msg.event_management.exception.OverlappingEventsException;
import ro.msg.event_management.repository.EventRepository;
import ro.msg.event_management.repository.EventSublocationRepository;
import ro.msg.event_management.repository.LocationRepository;
import ro.msg.event_management.repository.PictureRepository;
import ro.msg.event_management.repository.SublocationRepository;
import ro.msg.event_management.security.User;
import ro.msg.event_management.utils.ComparisonSign;
import ro.msg.event_management.utils.SortCriteria;
import ro.msg.event_management.utils.TimeValidation;

@Service
@RequiredArgsConstructor
public class EventService {


    private final EventRepository eventRepository;
    private final SublocationRepository sublocationRepository;
    private final PictureRepository pictureRepository;
    private final TicketCategoryService ticketCategoryService;
    private final EventSublocationRepository eventSublocationRepository;
    private final LocationRepository locationRepository;
    private final PictureService pictureService;
    private final EventSublocationService eventSublocationService;
    private final SublocationService sublocationService;

    @PersistenceContext(type = PersistenceContextType.TRANSACTION)
    private final EntityManager entityManager;

    @Transactional(rollbackFor = {OverlappingEventsException.class, ExceededCapacityException.class})
    public Event saveEvent(Event event, Long locationId) throws OverlappingEventsException, ExceededCapacityException {

        LocalDate startDate = event.getStartDate();
        LocalDate endDate = event.getEndDate();
        LocalTime startHour = event.getStartHour();
        LocalTime endHour = event.getEndHour();

        Location location = locationRepository.findById(locationId).orElseThrow(() -> {
            throw new NoSuchElementException("No location with id=" + locationId);
        });
        List<Long> sublocationIDs = location.getSublocation().stream()
                .map(BaseEntity::getId)
                .collect(Collectors.toList());
        TimeValidation.validateTime(startDate, endDate, startHour, endHour);

        boolean validSublocations = true;
        int sumCapacity = 0;
        for (Long l : sublocationIDs) {
            if (!checkOverlappingEvents(startDate, endDate, startHour, endHour, l)) {
                validSublocations = false;
            }
            sumCapacity += sublocationRepository.getOne(l).getMaxCapacity();
        }

        if (validSublocations && sumCapacity >= event.getMaxPeople()) {
            Event savedEvent = eventRepository.save(event);
            List<EventSublocation> eventSublocations = new ArrayList<>();
            sublocationIDs.forEach(sublocationID -> {
                EventSublocationID esID = new EventSublocationID(event.getId(), sublocationID);
                EventSublocation eventSublocation = new EventSublocation();
                eventSublocation.setEventSublocationID(esID);
                eventSublocation.setEvent(event);
                eventSublocation.setSublocation(this.sublocationRepository.findById(sublocationID).orElseThrow(() -> {
                    throw new NoSuchElementException("No sublocation with id=" + sublocationID);
                }));
                eventSublocations.add(eventSublocation);
            });
            event.setEventSublocations(eventSublocations);
            ticketCategoryService.saveTicketCategories(savedEvent.getTicketCategories(), savedEvent);
            return savedEvent;
        } else if (!validSublocations) {
            throw new OverlappingEventsException("Event overlaps another scheduled event");
        } else {
            throw new ExceededCapacityException("MaxPeople exceeds capacity of sublocations");
        }
    }

    public boolean checkOverlappingEvents(LocalDate startDate, LocalDate endDate, LocalTime startHour, LocalTime endHour, long sublocation) {
        List<Event> overlappingEvents = eventRepository.findOverlappingEvents(startDate, endDate, startHour, endHour, sublocation);
        return overlappingEvents.isEmpty();
    }

    @Transactional(rollbackFor = {OverlappingEventsException.class, ExceededCapacityException.class})
    public Event updateEvent(Event event, List<Long> ticketCategoryToDelete, Long updatedLocation) throws OverlappingEventsException, ExceededCapacityException {
        Optional<Event> eventOptional;
        eventOptional = eventRepository.findById(event.getId());

        if (eventOptional.isPresent()) {
            this.pictureRepository.deleteByEvent(eventOptional.get());
            Event eventFromDB = eventOptional.get();

            LocalDate startDate = event.getStartDate();
            LocalDate endDate = event.getEndDate();
            LocalTime startHour = event.getStartHour();
            LocalTime endHour = event.getEndHour();

            TimeValidation.validateTime(startDate, endDate, startHour, endHour);

            boolean validSublocation = true;
            int sumCapacity = 0;

            List<Long> sublocationsId = eventFromDB.getEventSublocations()
                    .stream()
                    .map(EventSublocation::getSublocation)
                    .map(Sublocation::getId)
                    .collect(Collectors.toList());

            for (Long subId : sublocationsId) {
                if (!checkOverlappingEvents(eventFromDB.getId(), startDate, endDate, startHour, endHour, subId)) {
                    validSublocation = false;
                }
                sumCapacity += sublocationRepository.getOne(subId).getMaxCapacity();
            }

            if (validSublocation) {
                if (sumCapacity >= event.getMaxPeople()) {
                    eventFromDB.setStartDate(startDate);
                    eventFromDB.setEndDate(endDate);
                    eventFromDB.setStartHour(startHour);
                    eventFromDB.setEndHour(endHour);
                    eventFromDB.setTitle(event.getTitle());
                    eventFromDB.setSubtitle(event.getSubtitle());
                    eventFromDB.setDescription(event.getDescription());
                    eventFromDB.setMaxPeople(event.getMaxPeople());
                    eventFromDB.setCreator(event.getCreator());
                    eventFromDB.setHighlighted(event.isHighlighted());
                    eventFromDB.setStatus(event.isStatus());
                    eventFromDB.setTicketsPerUser(event.getTicketsPerUser());
                    eventFromDB.setObservations(event.getObservations());
                    eventFromDB.getPictures().addAll(event.getPictures());
                    eventFromDB.setTicketInfo(event.getTicketInfo());

                    //update sublocation
                    List<EventSublocation> eventSublocations = new ArrayList<>();
                    Location location = this.locationRepository.findById(updatedLocation)
                            .orElseThrow(() -> {
                                throw new NoSuchElementException("No location with id=" + updatedLocation);
                            });

                    this.eventSublocationRepository.deleteByEvent(eventFromDB);
                    long idSublocation = eventFromDB.getEventSublocations().get(0).getEventSublocationID().getSublocation();

                    if (!this.sublocationRepository.findById(idSublocation).orElseThrow(() -> {
                        throw new NoSuchElementException("No sublocation with id=" + idSublocation);
                    }).getLocation().getId().equals(updatedLocation)) {
                        for (Long sublocationID : location.getSublocation().stream().map(BaseEntity::getId).collect(Collectors.toList())) {
                            EventSublocationID esID = new EventSublocationID(event.getId(), sublocationID);
                            EventSublocation eventSublocation = new EventSublocation();
                            eventSublocation.setEventSublocationID(esID);
                            eventSublocation.setEvent(eventFromDB);
                            eventSublocation.setSublocation(this.sublocationRepository.findById(sublocationID).orElseThrow(() -> {
                                throw new NoSuchElementException("No sublocation with id=" + sublocationID);
                            }));
                            eventSublocations.add(eventSublocation);
                        }

                        eventFromDB.getEventSublocations().clear();
                        eventSublocations.forEach(eventSublocation -> eventFromDB.getEventSublocations().add(eventSublocation));
                    }

                    //update ticket category
                    for (Long ticketCategoryId : ticketCategoryToDelete) {
                        this.ticketCategoryService.deleteTicketCategory(ticketCategoryId);
                    }

                    List<TicketCategory> categoriesToSave = new ArrayList<>();
                    event.getTicketCategories().forEach(ticketCategory ->
                    {
                        if (ticketCategory.getId() < 0) {
                            categoriesToSave.add(ticketCategory);
                        } else {
                            eventFromDB.getTicketCategories().forEach(ticketCategoryFromDB -> {
                                if (ticketCategoryFromDB.getId().equals(ticketCategory.getId())) {
                                    this.ticketCategoryService.updateTicketCategory(ticketCategory);
                                }
                            });
                        }
                    });

                    this.ticketCategoryService.saveTicketCategories(categoriesToSave, eventFromDB);

                    return eventFromDB;

                } else throw new ExceededCapacityException("exceed capacity");
            } else throw new OverlappingEventsException("overlaps other events");
        } else throw new NoSuchElementException();
    }

    public boolean checkOverlappingEvents(Long eventID, LocalDate startDate, LocalDate endDate, LocalTime startHour, LocalTime endHour, long sublocation) {
        List<Event> foundEvents = eventRepository.findOverlappingEvents(startDate, endDate, startHour, endHour, sublocation);
        List<Event> overlapingEvents = foundEvents
                .stream()
                .filter(event -> !event.getId().equals(eventID))
                .collect(Collectors.toList());
        return overlapingEvents.isEmpty();
    }

    public void deleteEvent(long id) {
        Optional<Event> optionalEvent = this.eventRepository.findById(id);
        if (optionalEvent.isEmpty()) {
            throw new NoSuchElementException("No event with id= " + id);
        }
        this.eventRepository.deleteById(id);
    }

    public Page<EventView> filter(Pageable pageable, String title, String subtitle, Boolean status, Boolean highlighted, String location, LocalDate startDate, LocalDate endDate, LocalTime startHour, LocalTime endHour, ComparisonSign rateSign, Float rate, ComparisonSign maxPeopleSign, Integer maxPeople, SortCriteria sortCriteria, Boolean sortType, List<String> multipleLocations) {

        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<EventView> q = criteriaBuilder.createQuery(EventView.class);
        Root<EventView> c = q.from(EventView.class);
        List<Predicate> predicate = new ArrayList<>();
        if (title != null) {
            Expression<String> path = c.get("title");
            Expression<String> upper = criteriaBuilder.upper(path);
            predicate.add(criteriaBuilder.like(upper, "%" + title.toUpperCase() + "%"));
        }
        if (subtitle != null) {
            Expression<String> path = c.get("subtitle");
            Expression<String> upper = criteriaBuilder.upper(path);
            predicate.add(criteriaBuilder.like(upper, "%" + subtitle.toUpperCase() + "%"));
        }
        if (status != null) {
            predicate.add(criteriaBuilder.equal(c.get("status"), status));
        }

        if (highlighted != null) {
            predicate.add(criteriaBuilder.equal(c.get("highlighted"), highlighted));
        }

        if (location != null) {
            Expression<String> path = c.get("location");
            Expression<String> upper = criteriaBuilder.upper(path);
            predicate.add(criteriaBuilder.like(upper, "%" + location.toUpperCase() + "%"));

        }

        if (multipleLocations != null) {
            Expression<String> path = c.get("location");
            predicate.add(path.in(multipleLocations));

        }

        if (startDate != null && endDate != null) {
            Predicate firstCase = criteriaBuilder.between(c.get("startDate"), startDate, endDate);
            Predicate secondCase = criteriaBuilder.between(c.get("endDate"), startDate, endDate);
            Predicate thirdCase = criteriaBuilder.greaterThanOrEqualTo(c.get("endDate"), endDate);
            Predicate fourthCase = criteriaBuilder.lessThanOrEqualTo(c.get("startDate"), startDate);
            Predicate fifthCase = criteriaBuilder.and(thirdCase, fourthCase);
            predicate.add(criteriaBuilder.or(firstCase, secondCase, fifthCase));

        }
        if (startHour != null && endHour != null) {
            Predicate firstCase = criteriaBuilder.between(c.get("startHour"), startHour, endHour);
            Predicate secondCase = criteriaBuilder.between(c.get("endHour"), startHour, endHour);
            Predicate thirdCase = criteriaBuilder.greaterThanOrEqualTo(c.get("endHour"), endHour);
            Predicate fourthCase = criteriaBuilder.lessThanOrEqualTo(c.get("startHour"), startHour);
            Predicate fifthCase = criteriaBuilder.and(thirdCase, fourthCase);
            predicate.add(criteriaBuilder.or(firstCase, secondCase, fifthCase));
        }

        if (maxPeople != null) {
            predicate.add(this.getPredicate(maxPeopleSign, "maxPeople", (float) maxPeople, criteriaBuilder, c));
        }

        if (rateSign != null) {
            predicate.add(this.getPredicate(rateSign, "rate", rate, criteriaBuilder, c));
        }
        Predicate finalPredicate = criteriaBuilder.and(predicate.toArray(new Predicate[0]));
        q.where(finalPredicate);
        String criteria = null;
        if (sortCriteria != null) {
            switch (sortCriteria) {
                case DATE:
                    criteria = "startDate";
                    break;
                case HOUR:
                    criteria = "startHour";
                    break;
                case OCCUPANCY_RATE:
                    criteria = "rate";
                    break;
                default:
                    break;
            }
        }
        if (sortType != null) {
            if (sortType) q.orderBy(criteriaBuilder.asc(c.get(criteria)));
            else q.orderBy(criteriaBuilder.desc(c.get(criteria)));
        }
        TypedQuery<EventView> typedQuery = entityManager.createQuery(q);
        typedQuery.setFirstResult((int) pageable.getOffset());
        typedQuery.setMaxResults(pageable.getPageSize());
        List<EventView> result = typedQuery.getResultList();

        CriteriaQuery<Long> sc = criteriaBuilder.createQuery(Long.class);
        Root<EventView> rootSelect = sc.from(EventView.class);
        sc.select(criteriaBuilder.count(rootSelect));
        sc.where(finalPredicate);
        Long count = entityManager.createQuery(sc).getSingleResult();
        return new PageImpl<>(result, pageable, count);

    }
    public Page<EventView> filterEventsByEndDate(Pageable pageable,String title,List<String> multipleLocations,ComparisonSign rateSign, Float rate, LocalDate startDate, short timeCriteria){
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<EventView> q = criteriaBuilder.createQuery(EventView.class);
        Root<EventView> c = q.from(EventView.class);
        List<Predicate> predicate = new ArrayList<>();
        Predicate predicate1 = null;
        if (startDate != null) {
            switch (timeCriteria){
                case 0 : predicate1 = criteriaBuilder.lessThan(c.get("endDate"), startDate); break;
                case 1 : predicate1 = criteriaBuilder.greaterThanOrEqualTo(c.get("endDate"), startDate); break;
                default: break;
            }
            predicate.add(predicate1);
        }
        if (multipleLocations != null) {
            Expression<String> path = c.get("location");
            predicate.add(path.in(multipleLocations));

        }
        if (title != null) {
            Expression<String> path = c.get("title");
            Expression<String> upper = criteriaBuilder.upper(path);
            predicate.add(criteriaBuilder.like(upper, "%" + title.toUpperCase() + "%"));
        }
        if (rateSign != null) {
            predicate.add(this.getPredicate(rateSign, "rate", rate, criteriaBuilder, c));
        }

        Predicate finalPredicate = criteriaBuilder.and(predicate.toArray(new Predicate[0]));
        q.where(finalPredicate);
        TypedQuery<EventView> typedQuery = entityManager.createQuery(q);
        typedQuery.setFirstResult((int) pageable.getOffset());
        typedQuery.setMaxResults(pageable.getPageSize());
        List<EventView> result = typedQuery.getResultList();

        CriteriaQuery<Long> sc = criteriaBuilder.createQuery(Long.class);
        Root<EventView> rootSelect = sc.from(EventView.class);
        sc.select(criteriaBuilder.count(rootSelect));
        sc.where(finalPredicate);
        Long count = entityManager.createQuery(sc).getSingleResult();
        return new PageImpl<>(result, pageable, count);
    }


    public Predicate getPredicate(ComparisonSign comparisonSign, String criteria, Float value, CriteriaBuilder criteriaBuilder, Root<EventView> c) {
        switch (comparisonSign) {
            case GREATER:
                return criteriaBuilder.gt(c.get(criteria), value);
            case LOWER:
                return criteriaBuilder.lessThan(c.get(criteria), value);
            case EQUAL:
                return criteriaBuilder.equal(c.get(criteria), value);
            case GREATEROREQUAL:
                return criteriaBuilder.greaterThanOrEqualTo(c.get(criteria), value);
            case LOWEROREQUAL:
                return criteriaBuilder.lessThanOrEqualTo(c.get(criteria), value);
            default:
                return null;
        }
    }


    public Event getEvent(long id) {
        Optional<Event> eventOptional = this.eventRepository.findById(id);
        if (eventOptional.isPresent()) {
            return eventOptional.get();
        } else {
            throw new NoSuchElementException("No event with id= " + id);
        }
    }

    public List<Event> findAll(){
        return eventRepository.findAll();
    }

    public Event findOne(Long id){
        var ev = eventRepository.findById(id);
        return ev.orElse(null);
    }

    public Page<Event> filterAndPaginateEventsAttendedByUser(User user, Pageable pageable) {
        return eventRepository.findByUserInPast(user.getIdentificationString(), pageable);
    }

    public Page<Event> filterAndPaginateEventsUserWillAttend(User user, Pageable pageable) {
        return eventRepository.findByUserInFuture(user.getIdentificationString(), pageable);
    }

    public InputStreamResource writeCsv() throws FileNotFoundException {
        var events = this.findAll();

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
        headers.add("picturesUrls");
        headers.add("sublocationIds");
        headers.add("ticketCategoryTitle|ticketCategorySubtitle|ticketCategoryPrice|ticketCategoryDescription|ticketCategoryMax|ticketCategoryAvailable");

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
                    writer.write(String.valueOf(picture.getUrl()));
                    writer.write(';');
                }
                writer.write(',');

                var sublocations = event.getEventSublocations();
                for(EventSublocation sublocation: sublocations){
                    writer.write(String.valueOf(sublocation.getEventSublocationID().getSublocation()));
                    writer.write(';');
                }
                writer.write(',');

                var categories = event.getTicketCategories();
                for(TicketCategory category: categories){
                    writer.write(category.getTitle());
                    writer.write('|');

                    writer.write(category.getSubtitle());
                    writer.write('|');

                    writer.write(Float.valueOf(category.getPrice()).toString());
                    writer.write('|');

                    writer.write(category.getDescription());
                    writer.write('|');

                    writer.write(Integer.valueOf(category.getTicketsPerCategory()).toString());
                    writer.write('|');

                    writer.write(String.valueOf(category.isAvailable()));
                    writer.write(';');
                }
                writer.write('\n');

            }
            writer.close();

        } catch (IOException e){
            e.printStackTrace();
        }

        return new InputStreamResource(new FileInputStream(filename));
    }

    public String saveCsv(MultipartFile csv) throws IOException, OverlappingEventsException, ExceededCapacityException {
        InputStream inputStream = csv.getInputStream();

        var reader = new BufferedReader(new InputStreamReader(inputStream));

        reader.readLine(); // skip header
        StringBuffer errorString = new StringBuffer();

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

            var picturesUrls = fields[14];

            var locationId = fields[17];

            var event = new Event();
            if(title.equals("")) {
                errorString.append("Skipped invalid row\n");
                continue;
            }
            event.setTitle(title);

            if(subtitle.equals("")) {
                errorString.append("Skipped invalid row\n");
                continue;
            }
            event.setSubtitle(subtitle);

            if(status.equals("")) {
                errorString.append("Skipped invalid row\n");
                continue;
            }
            event.setStatus(Boolean.parseBoolean(status));

            if(startDate.equals("")) {
                errorString.append("Skipped invalid row\n");
                continue;
            }
            event.setStartDate(LocalDate.parse(startDate));

            if(endDate.equals("")) {
                errorString.append("Skipped invalid row\n");
                continue;
            }
            event.setEndDate(LocalDate.parse(endDate));

            if(endHour.equals("")) {
                errorString.append("Skipped invalid row\n");
                continue;
            }
            event.setEndHour(LocalTime.parse(endHour));

            if(startHour.equals("")) {
                errorString.append("Skipped invalid row\n");
                continue;
            }
            event.setStartHour(LocalTime.parse(startHour));

            if(maxPeople.equals("")) {
                errorString.append("Skipped invalid row\n");
                continue;
            }
            event.setMaxPeople(Integer.parseInt(maxPeople));

            if(description.equals("")) {
                errorString.append("Skipped invalid row\n");
                continue;
            }
            event.setDescription(description);

            if(highlighted.equals("")) {
                errorString.append("Skipped invalid row\n");
                continue;
            }
            event.setHighlighted(Boolean.parseBoolean(highlighted));

            if(observations.equals("")) {
                errorString.append("Skipped invalid row\n");
                continue;
            }
            event.setObservations(observations);

            if(ticketsPerUser.equals("")) {
                errorString.append("Skipped invalid row\n");
                continue;
            }
            event.setTicketsPerUser(Integer.parseInt(ticketsPerUser));

            if(creator.equals("")) {
                errorString.append("Skipped invalid row\n");
                continue;
            }
            event.setCreator(creator);

            if(ticketInfo.equals("")) {
                errorString.append("Skipped invalid row\n");
                continue;
            }
            event.setTicketInfo(ticketInfo);

            if(locationId.equals("")){
                errorString.append("Skipped invalid row\n");
                continue;
            }

            //add category
            var categories = fields[16];
            var ids4 = categories.split(";");
            var list = new ArrayList<TicketCategory>();
            for(String category: ids4){
                var data = category.split("\\|");
                var cat = new TicketCategory();
                cat.setTitle(data[0]);
                cat.setSubtitle(data[1]);
                cat.setPrice(Float.parseFloat(data[2]));
                cat.setDescription(data[3]);
                cat.setTicketsPerCategory(Integer.parseInt(data[4]));
                cat.setAvailable(Boolean.parseBoolean(data[5]));

                list.add(cat);
            }
            event.setTicketCategories(list);

            try {
                Long.parseLong(locationId);
            }catch (NumberFormatException e){
                errorString.append("Location id must be a number!\n");
                continue;
            }
            event = this.saveEvent(event, Long.parseLong(locationId));

            //add pictures to db
            var urls = picturesUrls.split(";");
            for(String url: urls){
                var pic = new Picture();
                pic.setEvent(event);
                pic.setUrl(url);
                pictureService.savePicture(pic);
            }

            //add eventsublocation to db
            var sublocationIds = fields[15];
            var ids2 = sublocationIds.split(";");
            for(String id: ids2){
                if(!id.equals("")) {
                    try {
                        var subLocation = sublocationService.findById(Long.parseLong(id));
                        var eventSublocation = new EventSublocation();
                        eventSublocation.setEvent(event);
                        eventSublocation.setSublocation(subLocation);
                        eventSublocationService.saveES(eventSublocation);
                    }
                    catch (Exception e){

                    }
                }
            }
        }

        if(errorString.toString().equals("")){
            errorString.append("Success\n");
        }

        return errorString.toString();
    }
}
