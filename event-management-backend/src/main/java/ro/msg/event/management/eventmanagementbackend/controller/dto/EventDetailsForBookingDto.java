package ro.msg.event.management.eventmanagementbackend.controller.dto;

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
public class EventDetailsForBookingDto {
    private long id;
    private String title;
    private String subtitle;
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalTime startHour;
    private LocalTime endHour;
    private String ticketInfo;
    private String locationName;
    private String locationAddress;
}
