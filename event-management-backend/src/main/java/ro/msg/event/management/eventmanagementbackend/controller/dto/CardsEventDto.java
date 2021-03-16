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
public class CardsEventDto {
    private Long id;
    private String title;
    private Float occupancyRate;
    private LocalDate startDate;
    private LocalDate endDate;
}
