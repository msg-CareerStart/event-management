package ro.msg.event_management.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EventDetailsForUserDto {
    private EventDto eventDto;
    private String locationName;
    private String locationAddress;
}
