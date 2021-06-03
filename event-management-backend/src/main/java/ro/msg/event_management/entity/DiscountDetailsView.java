package ro.msg.event_management.entity;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DiscountDetailsView {
    private long ticketCategoryId;
    private String ticketCategory;
    private String discountCode;
}
