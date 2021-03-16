package ro.msg.event_management.controller.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookingCalendarDto {
    private Long id;
    private LocalDate startDate;
    private LocalDate endDate;
    private String title;
}
