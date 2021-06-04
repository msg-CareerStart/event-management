package ro.msg.event_management.entity;


import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class NotificationId implements Serializable {
    private static final long serialVersionUID = 1L;

    @Column(name = "user")
    private Long user;

    @Column(name = "event")
    private Long event;

}