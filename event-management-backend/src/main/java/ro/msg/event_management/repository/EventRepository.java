package ro.msg.event_management.repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.AbstractMap;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ro.msg.event_management.entity.Event;

public interface EventRepository extends JpaRepository<Event, Long> {

    @Query("select e from Event e join EventSublocation es on e.id = es.event.id " +
            "where (e.startDate>= :startDate and e.startDate<= :endDate and e.startHour >= :startHour and e.startHour <= :endHour) " +
            "or (e.endDate <= :endDate and e.endDate >= :startDate and e.endHour <= :endHour and e.endHour >= :startHour)" +
            " and es.sublocation.id = :sublocation")
    List<Event> findOverlappingEvents(@Param("startDate") LocalDate startDate,
                                      @Param("endDate") LocalDate endDate,
                                      @Param("startHour") LocalTime startHour,
                                      @Param("endHour") LocalTime endHour,
                                      @Param("sublocation") long sublocation);

    List<Event> findAllByHighlighted(boolean highlighted);

    @Query("SELECT e FROM Event e LEFT JOIN Booking b" +
            " ON e.id = b.event.id" +
            " WHERE b.user = :user" +
            " AND e.endDate < current_date()" +
            " GROUP BY e.id" +
            " ORDER BY e.startDate DESC")
    Page<Event> findByUserInPast(@Param("user") String user, Pageable pageable);

    @Query("SELECT e FROM Event e LEFT JOIN Booking b" +
            " ON e.id = b.event.id" +
            " WHERE b.user = :user" +
            " AND e.endDate > current_date()" +
            " GROUP BY e.id" +
            " ORDER BY e.startDate ASC")
    Page<Event> findByUserInFuture(@Param("user") String user, Pageable pageable);

    @Query("SELECT e FROM Event e INNER JOIN" +
            " Booking b on e.id = b.event.id" +
            " INNER JOIN Ticket t on b.id = t.booking.id" +
            " WHERE t.id= :id")
    Event findEventByTicket(@Param("id") long idTicket);

    @Query("SELECT SUM(TC.ticketsPerCategory) FROM TicketCategory TC" +
            " WHERE TC.event.id = :id")
    Integer getAvailableTicketsForEvent(@Param("id") long id);

    @Query("SELECT COUNT(td.validate)" +
            " FROM Ticket t" +
            " INNER JOIN Booking b ON t.booking.id = b.id and b.event.id = :id" +
            " INNER JOIN TicketDocument td ON t.id = td.id  and td.validate = TRUE")
    Integer getNrOfValidatedTicketsForEvent(long id);

    @Query("SELECT COUNT(t.id) FROM TicketCategory tc "+
            "INNER JOIN Ticket t ON t.ticketCategory.id = tc.id "+
            "WHERE tc.event.id= :id" )
    Integer getSoldTicketsForEvent(@Param("id")long eventId);

    @Query("SELECT TC.event.id" +
            " FROM TicketCategory TC" +
            " GROUP BY TC.event.id")
    List<Integer> getIdsOfEventsWithTicketsOnSale();

    @Query("SELECT e.id FROM Event e")
    List<Long> getAllEventIds();
}