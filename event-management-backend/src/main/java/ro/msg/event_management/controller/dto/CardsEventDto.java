package ro.msg.event_management.controller.dto;

import java.time.LocalDate;
import java.time.LocalTime;

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
    private LocalTime startHour;
    private LocalTime endHour;
    private LocationDto locationDto;
    private String location;
    private String pictureUrl;
}
