package ro.msg.event_management.entity;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="notification")
@Builder
@Table(name="notification")
public class Notification implements Serializable {

    @EmbeddedId
    private NotificationId id;

    @Column(name="user_id")
    private Long userID;

    @Column(name="event_id")
    private Long eventID;

}