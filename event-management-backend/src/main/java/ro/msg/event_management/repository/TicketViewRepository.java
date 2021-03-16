package ro.msg.event_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.msg.event_management.entity.view.TicketView;

public interface TicketViewRepository extends JpaRepository<TicketView,Long> {
}
