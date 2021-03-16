package ro.msg.event.management.eventmanagementbackend.controller.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EventDto {

    private long id;

    private String title;

    private String subtitle;

    private boolean status;

    private LocalDate startDate;

    private LocalDate endDate;

    private LocalTime startHour;

    private LocalTime endHour;

    private int maxPeople;

    private String description;

    private boolean highlighted;

    private String observations;

    private String creator;

    private long location;

    private List<String> picturesUrlSave;

    private int ticketsPerUser;

    private List<TicketCategoryDto> ticketCategoryDtoList;

    private List<Long> ticketCategoryToDelete;

    private String ticketInfo;
}
