package ro.msg.event.management.eventmanagementbackend.controller.converter;

import org.springframework.stereotype.Component;
import ro.msg.event.management.eventmanagementbackend.controller.dto.TicketListingDto;
import ro.msg.event.management.eventmanagementbackend.entity.view.TicketView;

@Component
public class TicketConverter implements Converter<TicketView, TicketListingDto> {
    @Override
    public TicketListingDto convert(TicketView obj) {
        return TicketListingDto.builder()
                .ticketId(obj.getTicketId())
                .bookingId(obj.getBookingId())
                .bookingDate(obj.getBookingDate())
                .eventName(obj.getEvent_title())
                .ticketCategory(obj.getCategory())
                .name(obj.getName())
                .pdfUrl(obj.getPdf_url()).build();
    }
}
