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
public class BookingDto {
    private long bookingId;
    private long eventId;
    private List<TicketDto> tickets;
    private LocalDateTime bookingDate;
    private String user;
}
