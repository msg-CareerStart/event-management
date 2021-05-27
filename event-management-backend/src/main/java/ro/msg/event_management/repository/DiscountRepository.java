package ro.msg.event_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ro.msg.event_management.entity.Discount;

import java.time.LocalDate;
import java.util.List;

public interface DiscountRepository extends JpaRepository<Discount, Long> {

    List<Discount> deleteByTicketCategoryId(long id);

    List<Discount> findByCodeAndTicketCategoryId(String code, long id);

    @Query("select d from Discount d " +
            "where ((d.startDate < :endDate) and (d.endDate > :startDate)) " +
            "and d.ticketCategory.id = :ticketCategory and d.code != :code")
    List<Discount> findOverlappingDiscounts(@Param("startDate") LocalDate startDate,
                                            @Param("endDate") LocalDate endDate,
                                            @Param("ticketCategory") long ticketCategory,
                                            @Param("code") String code);

}
