package ro.msg.event_management.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class TicketDto {
    private long ticketId;
    private String name;
    private String emailAddress;
    private long ticketCategoryId;

}
