package ro.msg.event_management.controller;

import java.io.*;
import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;

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
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import ro.msg.event_management.controller.converter.Converter;
import ro.msg.event_management.controller.dto.AvailableTicketsPerCategory;
import ro.msg.event_management.controller.dto.TicketListingDto;
import ro.msg.event_management.entity.Ticket;
import ro.msg.event_management.entity.view.TicketView;
import ro.msg.event_management.exception.TicketCorrespondingEventException;
import ro.msg.event_management.exception.TicketValidateException;
import ro.msg.event_management.security.User;
import ro.msg.event_management.service.*;

@RestController
@AllArgsConstructor
@RequestMapping("/tickets")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET,RequestMethod.POST,RequestMethod.PATCH, RequestMethod.OPTIONS}, allowedHeaders = {"Access- Control-Allow-Headers","Access-Control-Allow-Origin: *","Access-Control-Request-Method", "Access-Control-Request-Headers","Origin","Cache-Control", "Content-Type", "Authorization"}, exposedHeaders = {"Access-Control-Allow-Origin", "Access-Control-Allow-Credentials"})
public class TicketController {

    private final TicketService ticketService;
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

    @PostMapping(value = "/import")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity exportTicketsCsv(@RequestParam MultipartFile csv) throws IOException {
        var result = ticketService.saveCsv(csv);
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @GetMapping(value = "/export", produces = "text/csv")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<InputStreamResource> getTicketsCsv() throws FileNotFoundException {
        var result = ticketService.writeCsv();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
