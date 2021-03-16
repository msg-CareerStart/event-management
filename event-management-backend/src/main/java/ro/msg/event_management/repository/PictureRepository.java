package ro.msg.event_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.msg.event_management.entity.Event;
import ro.msg.event_management.entity.Picture;

public interface PictureRepository extends JpaRepository<Picture,Long> {
    void deleteByEvent(Event event);
}
