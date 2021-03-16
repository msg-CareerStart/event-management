package ro.msg.event.management.eventmanagementbackend.controller;

import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;
import javax.mail.MessagingException;

import com.itextpdf.text.DocumentException;
import lombok.AllArgsConstructor;
import net.minidev.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import ro.msg.event.management.eventmanagementbackend.controller.converter.CategoryAndTicketsMapReverseConverter;
import ro.msg.event.management.eventmanagementbackend.controller.converter.Converter;
import ro.msg.event.management.eventmanagementbackend.controller.dto.BookingDto;
import ro.msg.event.management.eventmanagementbackend.controller.dto.BookingSaveDto;
import ro.msg.event.management.eventmanagementbackend.entity.Booking;
import ro.msg.event.management.eventmanagementbackend.exception.TicketBuyingException;
import ro.msg.event.management.eventmanagementbackend.security.User;
import ro.msg.event.management.eventmanagementbackend.service.BookingService;

@RestController
@RequestMapping("/bookings")
@AllArgsConstructor
@CrossOrigin
public class BookingController {
    private final BookingService bookingService;
    private final Converter<BookingSaveDto, Booking> bookingSaveReverseConverter;
    private final Converter<Booking, BookingDto> bookingConverter;
    private final Object lock = new Object();

    @PostMapping
    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    public ResponseEntity<BookingDto> saveBooking(@RequestBody BookingSaveDto bookingSaveDto) {
        try {
            Booking booking = bookingSaveReverseConverter.convert(bookingSaveDto);

            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            User user = (User) auth.getPrincipal();
            booking.setUser(user.getIdentificationString());

            CategoryAndTicketsMapReverseConverter categoryAndTicketsMapReverseConverter = new CategoryAndTicketsMapReverseConverter();
            categoryAndTicketsMapReverseConverter.setBookingEmail(bookingSaveDto.getEmail());

            Booking savedBooking = null;

            synchronized (this.lock)
            {
                savedBooking = this.bookingService.saveBookingAndTicketDocument(booking, categoryAndTicketsMapReverseConverter.convert(bookingSaveDto.getTickets()), bookingSaveDto.getEventId());
            }

            return new ResponseEntity<>(this.bookingConverter.convert(savedBooking), HttpStatus.OK);
        } catch (TicketBuyingException ticketBuyingException) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, ticketBuyingException.getMessage(), ticketBuyingException);
        } catch (NoSuchElementException noSuchElementException) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, noSuchElementException.getMessage(), noSuchElementException);
        } catch (DocumentException | IOException documentException) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, documentException.getMessage(), documentException);
        }catch (MessagingException messagingException){
            throw new ResponseStatusException(HttpStatus.EXPECTATION_FAILED);
        }
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
    public ResponseEntity<List<JSONObject>> getAllMyBookings() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();
        List<JSONObject> objects = bookingService.getMyBookings(user.getIdentificationString()).stream().map(bookingCalendarDto -> {
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("id", bookingCalendarDto.getId());
            jsonObject.put("list",bookingService.getDatesInInterval(bookingCalendarDto.getStartDate(),bookingCalendarDto.getEndDate()));
            jsonObject.put("title",bookingCalendarDto.getTitle());
            return jsonObject;
        }).collect(Collectors.toList());
        return new ResponseEntity<>(objects, HttpStatus.OK);
    }


}
