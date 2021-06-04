package ro.msg.event_management.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class CheckDiscountDto {
    private List<Long> discountIDs;
    private String code;
    private List<Long> ticketCategories;
    private List<String> discountCodes;
    private List<Integer> percentages;
}
