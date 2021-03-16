package ro.msg.event.management.eventmanagementbackend.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class TicketCategoryDto {
    private long id;
    private String title;
    private String subtitle;
    private float price;
    private String description;
    private int ticketsPerCategory;
    private boolean available;
}
