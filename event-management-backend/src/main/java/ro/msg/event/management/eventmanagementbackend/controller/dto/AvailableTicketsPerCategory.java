package ro.msg.event.management.eventmanagementbackend.controller.dto;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AvailableTicketsPerCategory implements Serializable {
    private String title;
    private Long sold;
    private Long remaining;
}
