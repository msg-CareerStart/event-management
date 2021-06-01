package ro.msg.event_management.entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="user_form")
@Builder
@Table(name="user_form")
public class UserForm extends BaseEntity {

    @Column(name = "first_name")
    private String firstName;
    @Column(name = "last_name")
    private String lastName;
    @Column(name = "user_name")
    private String userName;
    @Column(name = "email")
    private String email;
    @Column(name= "occupancy_rate")
    private Float occupancyRate;
    @Column(name = "send_notification")
    private boolean sendNotification;

}