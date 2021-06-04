package ro.msg.event_management.controller.dto;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AvailableTicketsPerCategory implements Serializable {
    private Long categoryID;
    private String title;
    private Long sold;
    private Long remaining;
}
