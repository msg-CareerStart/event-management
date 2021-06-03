package ro.msg.event_management.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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

    @ManyToOne(fetch = FetchType.EAGER)
    @MapsId("user")
    @JoinColumn(name = "user")
    private UserForm user;

    @ManyToOne(fetch = FetchType.EAGER)
    @MapsId("event")
    @JoinColumn(name = "event")
    private Event event;

}