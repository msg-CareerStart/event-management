package ro.msg.event.management.eventmanagementbackend.controller.converter;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ro.msg.event.management.eventmanagementbackend.controller.dto.TicketSaveDto;
import ro.msg.event.management.eventmanagementbackend.entity.Ticket;

@NoArgsConstructor
public class CategoryAndTicketsMapReverseConverter implements Converter<List<TicketSaveDto>, Map<String, List<Ticket>>>{
    @Setter
    @Getter
    private String bookingEmail;

    @Override
    public Map<String, List<Ticket>> convert(List<TicketSaveDto> obj) {
        Map<String, List<Ticket>> categoryAndTicketsMap = new HashMap<>();
        obj.forEach(ticketSaveDto ->
        {
            Ticket ticket = Ticket.builder()
                    .name(ticketSaveDto.getName())
                    .emailAddress(bookingEmail)
                    .build();
            if (categoryAndTicketsMap.containsKey(ticketSaveDto.getTicketCategoryTitle())) {
                categoryAndTicketsMap.get(ticketSaveDto.getTicketCategoryTitle()).add(ticket);
            } else {
                List<Ticket> tickets = new ArrayList<>();
                tickets.add(ticket);
                categoryAndTicketsMap.put(ticketSaveDto.getTicketCategoryTitle(), tickets);
            }
        });
        return categoryAndTicketsMap;
    }
}
