
package ro.msg.event_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.msg.event_management.entity.Notification;
import ro.msg.event_management.entity.NotificationId;

public interface NotificationRepository extends JpaRepository<Notification, NotificationId> {
    public void deleteNotificationByUserIDAndEventID(long userID, long eventID);
}