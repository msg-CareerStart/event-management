package ro.msg.event.management.eventmanagementbackend.controller.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EventListingDto {
    private Long id;
    private String title;
    private String location;
    private LocalDate startDate;
    private LocalDate endDate;
}
