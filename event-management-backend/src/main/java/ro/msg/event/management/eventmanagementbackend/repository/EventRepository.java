package ro.msg.event.management.eventmanagementbackend.repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ro.msg.event.management.eventmanagementbackend.entity.Event;

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

}
