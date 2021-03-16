package ro.msg.event_management.controller.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class TicketListingDto {
    private Long ticketId;
    private Long bookingId;
    private LocalDate bookingDate;
    private String eventName;
    private String ticketCategory;
    private String name;
    private String pdfUrl;
}
