package ro.msg.event.management.eventmanagementbackend.controller.converter;

import org.springframework.stereotype.Component;
import ro.msg.event.management.eventmanagementbackend.controller.dto.BookingSaveDto;
import ro.msg.event.management.eventmanagementbackend.entity.Booking;

@Component
public class BookingSaveReverseConverter implements Converter<BookingSaveDto, Booking> {

    @Override
    public Booking convert(BookingSaveDto bookingSaveDto) {

        return Booking.builder()
                .bookingDate(bookingSaveDto.getBookingDate())
                .build();
    }
}
