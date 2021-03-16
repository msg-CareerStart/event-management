package ro.msg.event_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.msg.event_management.entity.view.EventView;

public interface EventViewRepository extends JpaRepository<EventView,Long> {
}
