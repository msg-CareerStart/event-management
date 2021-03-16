package ro.msg.event.management.eventmanagementbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.msg.event.management.eventmanagementbackend.entity.view.TicketView;

public interface TicketViewRepository extends JpaRepository<TicketView,Long> {
}
