package ro.msg.event_management.controller;

import java.io.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.dataformat.csv.CsvMapper;
import com.fasterxml.jackson.dataformat.csv.CsvParser;
import com.fasterxml.jackson.dataformat.csv.CsvSchema;
import lombok.AllArgsConstructor;
import net.minidev.json.JSONObject;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import ro.msg.event_management.controller.converter.Converter;
import ro.msg.event_management.controller.dto.AvailableTicketsPerCategory;
import ro.msg.event_management.controller.dto.EventDto;
import ro.msg.event_management.controller.dto.TicketListingDto;
import ro.msg.event_management.entity.Booking;
import ro.msg.event_management.entity.Ticket;
import ro.msg.event_management.entity.TicketCategory;
import ro.msg.event_management.entity.TicketDocument;
import ro.msg.event_management.entity.view.TicketView;
import ro.msg.event_management.exception.TicketCorrespondingEventException;
import ro.msg.event_management.exception.TicketValidateException;
import ro.msg.event_management.security.User;
import ro.msg.event_management.service.EventService;
import ro.msg.event_management.service.TicketService;

@RestController
@AllArgsConstructor
@RequestMapping("/tickets")
@CrossOrigin
public class TicketController {

    private final TicketService ticketService;
    private final EventService eventService;
    private final Converter<TicketView, TicketListingDto> convertToTicketDto;

    private static final LocalDate MAX_DATE = LocalDate.parse("2999-12-31");
    private static final LocalDate MIN_DATE = LocalDate.parse("1900-01-01");

    @GetMapping("/remaining/{id}")
    public ResponseEntity<List<AvailableTicketsPerCategory>> getAvailableTickets(@PathVariable Long id) {
        List<AvailableTicketsPerCategory> list = ticketService.getAvailableTickets(id);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/filter")
    public ResponseEntity<JSONObject> getFilteredTickets(Pageable pageable, @RequestParam(required = false) String title, @RequestParam(required = false) String startDate, @RequestParam(required = false) String endDate) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String user = ((User) auth.getPrincipal()).getIdentificationString();
        if (startDate != null && endDate == null){
            endDate = MAX_DATE.toString();
        }else if (startDate == null && endDate != null){
            startDate = MIN_DATE.toString();
        }
        Page<TicketView> page = ticketService.filterTickets(pageable, user, title, startDate != null ? LocalDate.parse(startDate) : null, endDate != null ? LocalDate.parse(endDate) : null);
        JSONObject responseBody = new JSONObject();
        responseBody.put("tickets", convertToTicketDto.convertAll(page.getContent()));
        responseBody.put("noPages", page.getTotalPages());
        responseBody.put("more", !page.isLast());
        return new ResponseEntity<>(responseBody, HttpStatus.OK);
    }

    @GetMapping(value = "/pdf/{id}", produces = "application/pdf")
    public ResponseEntity<InputStreamResource> getTicketPdf(@PathVariable long id)
    {
        InputStream pdfInputStream = this.ticketService.getPdf(id);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType("application/pdf"));
        headers.add("Access-Control-Allow-Origin", "*");
        headers.add("Access-Control-Allow-Methods", "GET, POST, PUT");
        headers.add("Access-Control-Allow-Headers", "Content-Type");
        headers.add("Content-Disposition", "filename= ticket.pdf");
        headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
        headers.add("Pragma", "no-cache");
        headers.add("Expires", "0");

        return new ResponseEntity<>(new InputStreamResource(pdfInputStream), headers, HttpStatus.OK);
    }
    @PatchMapping("/validate/{idTicket}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<JSONObject> validateTicket(@RequestParam long idEvent, @PathVariable Long idTicket) {
        String participantName;
        String participantEmail;
        try {
            Ticket ticket = ticketService.validateTicket(idEvent, idTicket);
            participantName = ticket.getName();
            participantEmail = ticket.getEmailAddress();
        } catch (TicketValidateException ticketValidateException) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, ticketValidateException.getMessage(), ticketValidateException);
        } catch (TicketCorrespondingEventException ticketCorrespondingEventException) {
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, ticketCorrespondingEventException.getMessage(), ticketCorrespondingEventException);
        } catch (NoSuchElementException noSuchElementException) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, noSuchElementException.getMessage(), noSuchElementException);
        }

        JSONObject responseBody = new JSONObject();
        responseBody.put("name", participantName);
        responseBody.put("email", participantEmail);
        return new ResponseEntity<>(responseBody, HttpStatus.OK);
    }

    @PostMapping(value = "/import", consumes = "text/csv")
    //@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public void exportTicketsCsv(@RequestBody InputStream csv) throws IOException {
        var reader = new BufferedReader(new InputStreamReader(csv));

        reader.readLine(); // skip header

        while(reader.ready()){
            String line = reader.readLine();
            var fields = line.split(",");

            var name = fields[0];
            var email = fields[1];
            var categoryTitle = fields[2];
            var categorySubtitle = fields[3];
            var categoryPrice = fields[4];
            var categoryDescription = fields[5];
            var categoryNr = fields[6];
            var categoryAvailable = fields[7];
            var categoryEventId = fields[8];
            var documentPdfUrl = fields[9];
            var bookingDate = fields[10];
            var bookingUser = fields[11];
            var bookingEventId = fields[12];

            var category = new TicketCategory();
            category.setTitle(categoryTitle);
            category.setSubtitle(categorySubtitle);
            category.setPrice(Float.parseFloat(categoryPrice));
            category.setDescription(categoryDescription);
            category.setTicketsPerCategory(Integer.parseInt(categoryNr));
            category.setAvailable(Boolean.parseBoolean(categoryAvailable));
            var event = eventService.findOne(Long.valueOf(categoryEventId));
            category.setEvent(event);

            var document = new TicketDocument();
            document.setPdfUrl(documentPdfUrl);
            //ticket id + validate?

            var booking = new Booking();
            booking.setBookingDate(LocalDateTime.parse(bookingDate));
            booking.setUser(bookingUser);
            //eventID
            var eventBooking = eventService.findOne(Long.valueOf(bookingEventId));
            booking.setEvent(eventBooking);

            var ticket = new Ticket();
            ticket.setName(name);
            ticket.setEmailAddress(email);
            ticket.setTicketCategory(category);
            ticket.setTicketDocument(document);
            ticket.setBooking(booking);

            int x=4;

        }
    }

    @GetMapping(value = "/export", produces = "text/csv")
    //@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<InputStreamResource> getTicketsCsv() throws FileNotFoundException {
        var tickets = ticketService.findAll();

        var headers = new ArrayList<String>();
        headers.add("name");
        headers.add("emailAddress");
        headers.add("ticketCategoryTitle");
        headers.add("ticketCategorySubtitle");
        headers.add("ticketCategoryPrice");
        headers.add("ticketCategoryDescription");
        headers.add("ticketCategoryNrPerCategory");
        headers.add("ticketCategoryAvailable");
        headers.add("ticketCategoryEventId");
        headers.add("ticketDocumentPdfUrl");
        headers.add("bookingDate");
        headers.add("bookingUser");
        headers.add("bookingEventId");

        try {
            var writer = new FileWriter("trial.csv");
            for(String s:headers){
                writer.write(s);
                writer.write(',');
            }

            writer.write("\n");
            for(Ticket ticket: tickets){
                writer.write(ticket.getName());
                writer.write(',');

                writer.write(ticket.getEmailAddress());
                writer.write(',');

                var category = ticket.getTicketCategory();
                writer.write(category.getTitle());
                writer.write(',');

                writer.write(category.getSubtitle());
                writer.write(',');

                writer.write(String.valueOf(category.getPrice()));
                writer.write(',');

                writer.write(category.getDescription());
                writer.write(',');

                writer.write(category.getTicketsPerCategory());
                writer.write(',');

                writer.write(String.valueOf(category.isAvailable()));
                writer.write(',');

                writer.write(String.valueOf(category.getEvent().getId()));
                writer.write(',');

                //writer.write(ticket.getTicketDocument().getPdfUrl());
                writer.write(',');

                writer.write(String.valueOf(ticket.getBooking().getBookingDate()));
                writer.write(',');

                writer.write(ticket.getBooking().getUser());
                writer.write(',');

                writer.write(String.valueOf(ticket.getBooking().getEvent().getId()));
                writer.write("\n");
            }
            writer.close();

        } catch (IOException e){
            e.printStackTrace();
        }

        return new ResponseEntity<InputStreamResource>(new InputStreamResource(new FileInputStream("trial.csv")), HttpStatus.OK);
    }
}
