package ro.msg.event.management.eventmanagementbackend.controller.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookingSaveDto {
    private List<TicketSaveDto> tickets;
    private LocalDateTime bookingDate;
    private long eventId;
    private String email;
}
