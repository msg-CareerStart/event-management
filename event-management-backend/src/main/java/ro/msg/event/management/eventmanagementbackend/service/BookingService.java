package ro.msg.event.management.eventmanagementbackend.service;

import com.amazonaws.auth.InstanceProfileCredentialsProvider;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.BarcodeQRCode;
import com.itextpdf.text.pdf.PdfWriter;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;
import ro.msg.event.management.eventmanagementbackend.entity.*;
import ro.msg.event.management.eventmanagementbackend.exception.TicketBuyingException;
import ro.msg.event.management.eventmanagementbackend.repository.BookingRepository;
import ro.msg.event.management.eventmanagementbackend.repository.EventRepository;
import ro.msg.event.management.eventmanagementbackend.repository.TicketDocumentRepository;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.util.List;
import java.util.*;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final EventRepository eventRepository;
    private static String ticketsBucketName = "event-management-tickets";
    private final TicketDocumentRepository ticketDocumentRepository;

    @Transactional(isolation = Isolation.SERIALIZABLE)
    public TicketCategory validateAndReturnTicketCategory(Event event, Map.Entry<Long, List<Ticket>> categoryWithTickets) throws TicketBuyingException {
        List<TicketCategory> ticketCategories = event.getTicketCategories();
        TicketCategory ticketCategory = ticketCategories.stream()
                .filter(category -> category.getId().equals(categoryWithTickets.getKey()))
                .findFirst()
                .orElseThrow(() -> {
                    throw new NoSuchElementException("No ticket category with id=" + categoryWithTickets.getKey());
                });

        long numberOfExistingTicketsForCategory = ticketCategory.getTickets().size();
        if (numberOfExistingTicketsForCategory + categoryWithTickets.getValue().size() > ticketCategory.getTicketsPerCategory()) {
            throw new TicketBuyingException("Number of tickets per category exceeds the maximum value!");
        }
        return ticketCategory;
    }

    @Transactional(isolation = Isolation.SERIALIZABLE)
    public Booking saveBooking(Booking booking, Map<Long, List<Ticket>> categoryIdsWithTickets, long eventId) {
        Optional<Event> eventOptional = this.eventRepository.findById(eventId);
        if (eventOptional.isEmpty()) {
            throw new NoSuchElementException("No event with id= " + eventId);
        }
        Event event = eventOptional.get();

        long numberOfTicketsToPurchase = categoryIdsWithTickets.values().stream().mapToInt(List::size).sum();

        //each user can buy only a certain amount of tickets at an event
        long totalNumberOfExistingTicketsForUserAtEvent = this.bookingRepository.countByUserAndEvent(booking.getUser(), event);
        if (totalNumberOfExistingTicketsForUserAtEvent + numberOfTicketsToPurchase > event.getTicketsPerUser()) {
            throw new TicketBuyingException("Number of tickets exceeds maximum number of tickets per user!");
        }

        //each ticket category has a certain amount of tickets that cannot be exceeded
        List<Ticket> ticketsToSave = new ArrayList<>();
        for (Map.Entry<Long, List<Ticket>> entry : categoryIdsWithTickets.entrySet()) {
            TicketCategory ticketCategory = this.validateAndReturnTicketCategory(event, entry);
            //set values for the tickets
            entry.getValue().forEach(ticket ->
            {
                ticket.setTicketCategory(ticketCategory);
                ticket.setBooking(booking);
                ticketsToSave.add(ticket);
            });
        }

        event.getBookings().add(booking);
        booking.setEvent(event);
        booking.setTickets(ticketsToSave);
        return this.bookingRepository.save(booking);
    }

    @Transactional
    public void createPdf(Booking savedBooking) throws FileNotFoundException, DocumentException {
        Event event = savedBooking.getEvent();
        Location location =  event.getEventSublocations().get(0).getSublocation().getLocation();

        for(Ticket ticket : savedBooking.getTickets())
        {
            TicketCategory ticketCategory = ticket.getTicketCategory();
            Document document = new Document();
            String fileName = ticket.getId() + ".pdf";
            PdfWriter.getInstance(document, new FileOutputStream(fileName));
            document.open();

            Paragraph beforeTextSpacing = new Paragraph("\n");
            beforeTextSpacing.setSpacingAfter(100);
            document.add(beforeTextSpacing);

            Font headerFont = FontFactory.getFont(FontFactory.TIMES_BOLD, 17, BaseColor.BLACK);
            Font bodyFont = FontFactory.getFont(FontFactory.TIMES, 17, BaseColor.BLACK);

            String pdfHeaderString = "Event: " + event.getTitle() + "\n" +
                    "Location: " + location.getName() + " " + location.getAddress() + "\n" +
                    "Date and hour: " + event.getStartDate() + " " + event.getStartHour() + "\n\n";

            Paragraph headerParagraph = new Paragraph(pdfHeaderString, headerFont);
            document.add(headerParagraph);

            String pdfBodyString = "Name: " + ticket.getName() + "\n" +
                    "Ticket category: " + ticketCategory.getTitle() + "\n" +
                    "Ticket category description: " + ticketCategory.getDescription() + "\n" +
                    "Event ticket information: " + event.getTicketInfo();

            Paragraph bodyParagraph = new Paragraph(pdfBodyString, bodyFont);
            bodyParagraph.setSpacingAfter(50);
            document.add(bodyParagraph);

            BarcodeQRCode qrCode = new BarcodeQRCode(savedBooking.getUser() + " " + ticket.getId().toString(), 1, 1, null);
            Image qrCodeImage = qrCode.getImage();
            qrCodeImage.scalePercent(300);
            qrCodeImage.setAlignment(Element.ALIGN_CENTER);
            document.add(qrCodeImage);

            document.setPageSize(PageSize.A4);
            document.close();

            File file = new File(fileName);
            String ticketUrl = this.saveDocumentToS3(file, fileName);
            this.saveTicketDocument(ticketUrl, ticket);
            file.delete();
        }
    }

    private void saveTicketDocument(String ticketUrl, Ticket ticket) {
        TicketDocument ticketDocument = new TicketDocument();
        ticketDocument.setPdfUrl(ticketUrl);
        ticketDocument.setTicket(ticket);
        ticketDocument.setValidate(false);
        this.ticketDocumentRepository.save(ticketDocument);
    }

    public String saveDocumentToS3(File file, String fileName)
    {
        AmazonS3 s3Client = AmazonS3ClientBuilder.standard()
                .withCredentials(new InstanceProfileCredentialsProvider(false))
                .build();

        final PutObjectRequest putObjectRequest = new PutObjectRequest(ticketsBucketName, fileName, file);
        s3Client.putObject(putObjectRequest);
        return s3Client.getUrl(ticketsBucketName, fileName).toString();
    }
}
