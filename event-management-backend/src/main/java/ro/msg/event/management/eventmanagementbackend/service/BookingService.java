package ro.msg.event.management.eventmanagementbackend.service;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import javax.mail.MessagingException;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceContextType;
import javax.persistence.TypedQuery;

import com.amazonaws.SdkClientException;
import com.amazonaws.auth.InstanceProfileCredentialsProvider;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Font;
import com.itextpdf.text.Image;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.AcroFields;
import com.itextpdf.text.pdf.BarcodeQRCode;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.ColumnText;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfReader;
import com.itextpdf.text.pdf.PdfStamper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ro.msg.event.management.eventmanagementbackend.controller.dto.BookingCalendarDto;
import ro.msg.event.management.eventmanagementbackend.entity.Booking;
import ro.msg.event.management.eventmanagementbackend.entity.Event;
import ro.msg.event.management.eventmanagementbackend.entity.Location;
import ro.msg.event.management.eventmanagementbackend.entity.Ticket;
import ro.msg.event.management.eventmanagementbackend.entity.TicketCategory;
import ro.msg.event.management.eventmanagementbackend.entity.TicketDocument;
import ro.msg.event.management.eventmanagementbackend.exception.TicketBuyingException;
import ro.msg.event.management.eventmanagementbackend.repository.BookingRepository;
import ro.msg.event.management.eventmanagementbackend.repository.EventRepository;
import ro.msg.event.management.eventmanagementbackend.repository.TicketCategoryRepository;
import ro.msg.event.management.eventmanagementbackend.repository.TicketDocumentRepository;
import ro.msg.event.management.eventmanagementbackend.repository.TicketRepository;
import ro.msg.event.management.eventmanagementbackend.security.User;

@Service
@RequiredArgsConstructor
@PropertySource("classpath:application.properties")
public class BookingService {

    private final BookingRepository bookingRepository;
    private final EventRepository eventRepository;
    private final TicketRepository ticketRepository;
    private final EmailSenderService emailSenderService;
    private final AmazonS3 s3Client = AmazonS3ClientBuilder.standard()
                                                           .withCredentials(
                                                               new InstanceProfileCredentialsProvider(false))
                                                           .withRegion(Regions.EU_WEST_1)
                                                           .build();

    @PersistenceContext(type = PersistenceContextType.TRANSACTION)
    private final EntityManager entityManager;

    @Value("${event-management.s3.tickets.bucketName}")
    private String bucketName;

    private final TicketDocumentRepository ticketDocumentRepository;
    private final TicketCategoryRepository ticketCategoryRepository;

    public TicketCategory validateAndReturnTicketCategory(Event event,
                                                          Map.Entry<String, List<Ticket>> categoryWithTickets) {
        List<TicketCategory> ticketCategories = this.ticketCategoryRepository.findByEvent(event);
        TicketCategory ticketCategory = ticketCategories.stream()
                                                        .filter(category -> category.getTitle().equals(
                                                            categoryWithTickets.getKey()))
                                                        .findFirst()
                                                        .orElseThrow(() -> {
                                                            throw new NoSuchElementException(
                                                                "No ticket category with title=" + categoryWithTickets
                                                                    .getKey());
                                                        });

        long numberOfExistingTicketsForCategory = ticketCategory.getTickets().size();
        if (numberOfExistingTicketsForCategory + categoryWithTickets.getValue().size() > ticketCategory
            .getTicketsPerCategory()) {
            throw new TicketBuyingException("Number of tickets per category exceeds the maximum value!");
        }
        return ticketCategory;
    }

    @Transactional(
        rollbackFor = {FileNotFoundException.class, DocumentException.class, MessagingException.class,
                       IOException.class})
    public Booking saveBookingAndTicketDocument(Booking booking, Map<String, List<Ticket>> categoryTitlesWithTickets,
                                                long eventId)
        throws IOException, DocumentException, MessagingException {
        Booking savedBooking = this.saveBooking(booking, categoryTitlesWithTickets, eventId);
        this.createAndSaveTicketDocument(savedBooking);
        sendEmail(booking, categoryTitlesWithTickets);
        return savedBooking;
    }

    public void sendEmail(Booking booking, Map<String, List<Ticket>> categoryTitlesWithTickets)
        throws MessagingException, IOException {
        Map<String, Object> model = new HashMap<>();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();
        model.put("firstName", user.getFirstName());
        model.put("lastName", user.getLastName());
        model.put("bookingId", booking.getId());
        model.put("bookingDate",
                  booking.getBookingDate().toLocalDate().format(DateTimeFormatter.ofPattern("dd.MM.yyyy")));
        model.put("eventName", booking.getEvent().getTitle());
        String eventDate = null;
        if (booking.getEvent().getStartDate().isEqual(booking.getEvent().getEndDate())) {
            eventDate = booking.getEvent().getStartDate().format(DateTimeFormatter.ofPattern("dd.MM.yyyy"));
        } else {
            eventDate = booking.getEvent().getStartDate()
                               .format(DateTimeFormatter.ofPattern("dd.MM.yyyy")) + "-" + booking.getEvent()
                                                                                                 .getEndDate().format(
                    DateTimeFormatter.ofPattern("dd.MM.yyyy"));
        }
        model.put("eventDate", eventDate);
        model.put("startHour",
                  booking.getEvent().getStartHour().getHour() + ":" + booking.getEvent().getStartHour().getMinute());
        model.put("endHour",
                  booking.getEvent().getEndHour().getHour() + ":" + booking.getEvent().getEndHour().getMinute());
        model.put("locationName",
                  booking.getEvent().getEventSublocations().get(0).getSublocation().getLocation().getName());
        model.put("eventAddress",
                  booking.getEvent().getEventSublocations().get(0).getSublocation().getLocation().getAddress());
        int totalNoTickets = 0;
        for (List<Ticket> value : categoryTitlesWithTickets.values()) {
            totalNoTickets += value.size();
        }
        model.put("noTickets", totalNoTickets);
        model.put("ticketInfo", booking.getEvent().getTicketInfo());
        HashMap<String, Integer> hashMap = new HashMap<>();
        for (Map.Entry<String, List<Ticket>> entry : categoryTitlesWithTickets.entrySet()) {
            String key = entry.getKey();
            Integer value = entry.getValue().size();
            hashMap.put(key, value);
        }
        model.put("tickets", hashMap);
        model.put("ticketsWithLists", categoryTitlesWithTickets);
        emailSenderService.sendEmail(emailSenderService.getMail(model, booking.getTickets().get(0).getEmailAddress()));
    }

    @Transactional
    public Booking saveBooking(Booking booking, Map<String, List<Ticket>> categoryTitlesWithTickets, long eventId) {
        Optional<Event> eventOptional = this.eventRepository.findById(eventId);
        if (eventOptional.isEmpty()) {
            throw new NoSuchElementException("No event with id= " + eventId);
        }
        Event event = eventOptional.get();

        long numberOfTicketsToPurchase = categoryTitlesWithTickets.values().stream().mapToInt(List::size).sum();

        //each user can buy only a certain amount of tickets at an event
        long totalNumberOfExistingTicketsForUserAtEvent = this.bookingRepository
            .findByUserAndEvent(booking.getUser(), event).stream()
            .mapToLong(booking1 -> booking1.getTickets().size())
            .sum();
        if (totalNumberOfExistingTicketsForUserAtEvent + numberOfTicketsToPurchase > event.getTicketsPerUser()) {
            throw new TicketBuyingException("Number of tickets exceeds maximum number of tickets per user!");
        }

        //each ticket category has a certain amount of tickets that cannot be exceeded
        List<Ticket> ticketsToSave = new ArrayList<>();
        for (Map.Entry<String, List<Ticket>> entry : categoryTitlesWithTickets.entrySet()) {
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

    public void createAndSaveTicketDocument(Booking savedBooking) throws IOException, DocumentException {
        Event event = savedBooking.getEvent();
        Location location = event.getEventSublocations().get(0).getSublocation().getLocation();

        for (Ticket ticket : savedBooking.getTickets()) {
            TicketCategory ticketCategory = ticket.getTicketCategory();

            PdfReader pdfReader = new PdfReader("template.pdf");
            String fileName = ticket.getId() + ".pdf";
            FileOutputStream fileOutputStream = new FileOutputStream(fileName);
            PdfStamper pdfStamper = new PdfStamper(pdfReader, fileOutputStream);
            AcroFields acroFields = pdfStamper.getAcroFields();
            PdfContentByte pdfContentByte = pdfStamper.getOverContent(1);
            BaseFont baseFont = BaseFont.createFont("FreeSerif-4aeK.ttf", BaseFont.IDENTITY_H, BaseFont.EMBEDDED);

            this.replaceFieldWithParagraph(acroFields, pdfContentByte, "eventNameLabel",
                                           new Paragraph("Nume eveniment:"), baseFont);
            this.replaceFieldWithParagraph(acroFields, pdfContentByte, "locationLabel", new Paragraph("Locația:"),
                                           baseFont);
            this.replaceFieldWithParagraph(acroFields, pdfContentByte, "addressLabel", new Paragraph("Adresa:"),
                                           baseFont);
            this.replaceFieldWithParagraph(acroFields, pdfContentByte, "dateLabel", new Paragraph("Data:"), baseFont);
            this.replaceFieldWithParagraph(acroFields, pdfContentByte, "hourLabel", new Paragraph("Ora:"), baseFont);
            this.replaceFieldWithParagraph(acroFields, pdfContentByte, "participantNameLabel",
                                           new Paragraph("Nume participant:"), baseFont);
            this.replaceFieldWithParagraph(acroFields, pdfContentByte, "ticketCategoryLabel",
                                           new Paragraph("Categoria:"), baseFont);
            this.replaceFieldWithParagraph(acroFields, pdfContentByte, "ticketCategoryDescriptionLabel",
                                           new Paragraph("Descrierea categoriei:"), baseFont);

            this.replaceFieldWithParagraph(acroFields, pdfContentByte, "eventName", new Paragraph(event.getTitle()),
                                           baseFont);
            this.replaceFieldWithParagraph(acroFields, pdfContentByte, "location", new Paragraph(location.getName()),
                                           baseFont);
            this.replaceFieldWithParagraph(acroFields, pdfContentByte, "address", new Paragraph(location.getAddress()),
                                           baseFont);

            if (event.getStartDate().isEqual(event.getEndDate())) {
                this.replaceFieldWithParagraph(acroFields, pdfContentByte, "date", new Paragraph(
                    event.getStartDate().format(DateTimeFormatter.ofPattern("dd.MM.yyyy"))), baseFont);
            } else {
                this.replaceFieldWithParagraph(acroFields, pdfContentByte, "date", new Paragraph(
                                                   event.getStartDate().format(DateTimeFormatter.ofPattern("dd.MM" +
                                                                                                           ".yyyy")) + " - " + event.getEndDate()
                                                                                                                                         .format(
                                                                                                                                             DateTimeFormatter
                                                                                                                                                 .ofPattern(
                                                                                                                                                     "dd.MM.yyyy"))),
                                               baseFont);
            }
            this.replaceFieldWithParagraph(acroFields, pdfContentByte, "hour",
                                           new Paragraph(String.valueOf(event.getStartHour())), baseFont);
            this.replaceFieldWithParagraph(acroFields, pdfContentByte, "participantName",
                                           new Paragraph(ticket.getName()), baseFont);
            this.replaceFieldWithParagraph(acroFields, pdfContentByte, "ticketCategory",
                                           new Paragraph(ticketCategory.getTitle()), baseFont);
            this.replaceFieldWithParagraph(acroFields, pdfContentByte, "ticketCategoryDescription",
                                           new Paragraph(ticketCategory.getDescription()), baseFont);

            Image image = Image.getInstance(event.getPictures().get(0).getUrl());
            this.replaceFieldWithImage(acroFields, pdfContentByte, "image", image);

            BarcodeQRCode qrCode = new BarcodeQRCode(savedBooking.getUser() + " " + ticket.getId().toString(), 1, 1,
                                                     null);
            Image qrCodeImage = qrCode.getImage();
            qrCodeImage.scalePercent(300);
            this.replaceFieldWithImage(acroFields, pdfContentByte, "qrCode", qrCodeImage);

            Paragraph eventTicketInfoParagraph = new Paragraph(event.getTicketInfo());
            this.replaceFieldWithParagraph(acroFields, pdfContentByte, "eventTicketInfo", eventTicketInfoParagraph,
                                           baseFont);

            pdfStamper.close();

            File file = new File(fileName);
            try {
                String ticketUrl = this.saveDocumentToS3(file, fileName);
                this.saveTicketDocument(ticketUrl, ticket);
            } catch (SdkClientException exception) {
                this.saveTicketDocument(fileName, ticket);
            }

            boolean fileDeletedFromLocalStorage = file.delete();
            if (!fileDeletedFromLocalStorage) {
                throw new IOException("Temporary local pdf could not be deleted!");
            }
        }
    }

    private void saveTicketDocument(String ticketUrl, Ticket ticket) {
        TicketDocument ticketDocument = new TicketDocument();
        ticketDocument.setPdfUrl(ticketUrl);
        ticketDocument.setTicket(ticket);
        ticketDocument.setValidate(false);
        this.ticketDocumentRepository.save(ticketDocument);
    }

    private void replaceFieldWithImage(AcroFields acroFields, PdfContentByte pdfContentByte, String fieldName,
                                       Image image) throws DocumentException {
        if (acroFields.getFieldPositions(fieldName) != null) {
            Rectangle rectangle = acroFields.getFieldPositions(fieldName).get(0).position;
            acroFields.removeField(fieldName);
            image.scaleAbsolute(rectangle.getRight() - rectangle.getLeft(), rectangle.getTop() - rectangle.getBottom());
            image.setAbsolutePosition(rectangle.getLeft(), rectangle.getBottom());
            pdfContentByte.addImage(image);
        }
    }

    private void replaceFieldWithParagraph(AcroFields acroFields, PdfContentByte pdfContentByte, String fieldName,
                                           Paragraph paragraph, BaseFont baseFont) throws DocumentException {
        if (acroFields.getFieldPositions(fieldName) != null) {
            Rectangle rectangle = acroFields.getFieldPositions(fieldName).get(0).position;
            if (fieldName.equals("eventTicketInfo")) {
                paragraph = new Paragraph("Informații despre bilet:\n" + paragraph.getContent());
                paragraph.setFont(new Font(baseFont, 8));
            } else {
                paragraph.setFont(new Font(baseFont, 10));
            }

            acroFields.removeField(fieldName);
            ColumnText columnText = new ColumnText(pdfContentByte);
            columnText.setSimpleColumn(rectangle);
            columnText.addElement(paragraph);
            columnText.go();
        }
    }

    public String saveDocumentToS3(File file, String fileName) {
        final PutObjectRequest putObjectRequest = new PutObjectRequest(this.bucketName, fileName, file);
        s3Client.putObject(putObjectRequest);
        return s3Client.getUrl(this.bucketName, fileName).toString();
    }


    public List<BookingCalendarDto> getMyBookings(String user) {
        TypedQuery<BookingCalendarDto> query
            = entityManager.createQuery(
            "SELECT NEW ro.msg.event.management.eventmanagementbackend.controller.dto.BookingCalendarDto(b.id, e.startDate, e.endDate, e.title)" +
            " FROM Booking b JOIN b.event e WHERE b.user = :user ORDER BY e.startDate", BookingCalendarDto.class);
        query.setParameter("user", user);
        return query.getResultList();
    }

    public List<LocalDate> getDatesInInterval(LocalDate startDate, LocalDate endDate) {
        List<LocalDate> localDates = new ArrayList<>();
        LocalDate tmp = startDate;
        while (tmp.isBefore(endDate) || tmp.equals(endDate)) {
            localDates.add(tmp);
            tmp = tmp.plusDays(1);
        }
        return localDates;
    }
}
