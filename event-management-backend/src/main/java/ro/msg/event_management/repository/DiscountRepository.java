package ro.msg.event_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ro.msg.event_management.entity.Discount;
import ro.msg.event_management.entity.TicketCategory;

import java.time.LocalDate;
import java.util.List;

public interface DiscountRepository extends JpaRepository<Discount, Long> {

    List<Discount> deleteByTicketCategoryId(long id);

    /*@Query("select * from Discount d join TicketCategory tc on d.id = tc.discount.id " +
            "where ((d.startDate>= :startDate and d.startDate<= :endDate) " +
            "or (e.endDate <= :endDate and e.endDate >= :startDate))  " +
            "and d.ticketCategory = :ticketCategory")
    List<Discount> findOverlappingDiscounts(@Param("startDate") LocalDate startDate,
                                            @Param("endDate") LocalDate endDate,
                                            @Param("ticketCategory") long ticketCategory);*/

}
