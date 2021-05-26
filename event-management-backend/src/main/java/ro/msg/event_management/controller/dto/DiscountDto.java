package ro.msg.event_management.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class DiscountDto {
    private long id;
    private String code;
    private int percentage;
    private LocalDate startDate;
    private LocalDate endDate;
}
