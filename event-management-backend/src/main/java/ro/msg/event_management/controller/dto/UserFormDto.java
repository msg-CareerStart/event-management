package ro.msg.event_management.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class UserFormDto {

    private long id;
    private String firstName;
    private String lastName;
    private String userName;
    private String email;
    private Float occupancyRate;
    private boolean sendNotification;
}