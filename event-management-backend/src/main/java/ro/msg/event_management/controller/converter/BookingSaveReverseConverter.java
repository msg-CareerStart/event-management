package ro.msg.event_management.controller.converter;

import org.springframework.stereotype.Component;
import ro.msg.event_management.controller.dto.BookingSaveDto;
import ro.msg.event_management.entity.Booking;

@Component
public class BookingSaveReverseConverter implements Converter<BookingSaveDto, Booking> {

    @Override
    public Booking convert(BookingSaveDto bookingSaveDto) {

        return Booking.builder()
                .bookingDate(bookingSaveDto.getBookingDate())
                .build();
    }
}
