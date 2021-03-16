package ro.msg.event.management.eventmanagementbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.msg.event.management.eventmanagementbackend.entity.view.EventView;

public interface EventViewRepository extends JpaRepository<EventView,Long> {
}
