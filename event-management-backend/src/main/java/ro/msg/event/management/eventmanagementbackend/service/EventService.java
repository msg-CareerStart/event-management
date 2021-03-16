package ro.msg.event.management.eventmanagementbackend.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ro.msg.event.management.eventmanagementbackend.entity.BaseEntity;
import ro.msg.event.management.eventmanagementbackend.entity.Event;
import ro.msg.event.management.eventmanagementbackend.entity.EventSublocation;
import ro.msg.event.management.eventmanagementbackend.entity.EventSublocationID;
import ro.msg.event.management.eventmanagementbackend.entity.Location;
import ro.msg.event.management.eventmanagementbackend.entity.Sublocation;
import ro.msg.event.management.eventmanagementbackend.entity.TicketCategory;
import ro.msg.event.management.eventmanagementbackend.entity.view.EventView;
import ro.msg.event.management.eventmanagementbackend.exception.ExceededCapacityException;
import ro.msg.event.management.eventmanagementbackend.exception.OverlappingEventsException;
import ro.msg.event.management.eventmanagementbackend.repository.EventRepository;
import ro.msg.event.management.eventmanagementbackend.repository.EventSublocationRepository;
import ro.msg.event.management.eventmanagementbackend.repository.LocationRepository;
import ro.msg.event.management.eventmanagementbackend.repository.PictureRepository;
import ro.msg.event.management.eventmanagementbackend.repository.SublocationRepository;
import ro.msg.event.management.eventmanagementbackend.security.User;
import ro.msg.event.management.eventmanagementbackend.utils.ComparisonSign;
import ro.msg.event.management.eventmanagementbackend.utils.SortCriteria;
import ro.msg.event.management.eventmanagementbackend.utils.TimeValidation;

@Service
@RequiredArgsConstructor
public class EventService {


    private final EventRepository eventRepository;
    private final SublocationRepository sublocationRepository;
    private final PictureRepository pictureRepository;
    private final TicketCategoryService ticketCategoryService;
    private final EventSublocationRepository eventSublocationRepository;
    private final LocationRepository locationRepository;

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

    public Page<Event> filterAndPaginateEventsAttendedByUser(User user, Pageable pageable) {
        return eventRepository.findByUserInPast(user.getIdentificationString(), pageable);
    }

    public Page<Event> filterAndPaginateEventsUserWillAttend(User user, Pageable pageable) {
        return eventRepository.findByUserInFuture(user.getIdentificationString(), pageable);
    }

}
