package ro.msg.event_management.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ro.msg.event_management.entity.Discount;

import java.util.List;

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
    private List<DiscountDto> discountDtoList;
}
