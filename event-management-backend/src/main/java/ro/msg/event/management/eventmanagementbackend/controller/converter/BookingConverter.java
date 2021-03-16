package ro.msg.event.management.eventmanagementbackend.controller.converter;

import java.util.stream.Collectors;

import org.springframework.stereotype.Component;
import ro.msg.event.management.eventmanagementbackend.controller.dto.BookingDto;
import ro.msg.event.management.eventmanagementbackend.controller.dto.TicketDto;
import ro.msg.event.management.eventmanagementbackend.entity.Booking;

@Component
public class BookingConverter implements Converter<Booking, BookingDto>{
    @Override
    public BookingDto convert(Booking obj) {
        return BookingDto.builder()
                .bookingId(obj.getId())
                .bookingDate(obj.getBookingDate())
                .eventId(obj.getEvent().getId())
                .user(obj.getUser())
                .tickets(obj.getTickets().stream()
                    .map(ticket ->
                            TicketDto.builder()
                                    .ticketId(ticket.getId())
                                    .emailAddress(ticket.getEmailAddress())
                                    .name(ticket.getName())
                                    .ticketCategoryId(ticket.getTicketCategory().getId())
                                    .build())
                    .collect(Collectors.toList()))
                .build();
    }
}
