package ro.msg.event_management.entity;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
@Builder
public class EventStatistics {
    private Long id;
    private int validatedTickets;
    private int availableTickets;
    private int totalTickets;
    private int unvalidatedTickets;
}

