package ro.msg.event_management.service;

import java.io.*;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceContextType;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import com.amazonaws.auth.InstanceProfileCredentialsProvider;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ro.msg.event_management.controller.dto.AvailableTicketsPerCategory;
import ro.msg.event_management.entity.*;
import ro.msg.event_management.entity.view.TicketView;
import ro.msg.event_management.exception.TicketCorrespondingEventException;
import ro.msg.event_management.exception.TicketValidateException;
import ro.msg.event_management.repository.*;

@Service
@RequiredArgsConstructor
@PropertySource("classpath:application.properties")
public class TicketService {

    private final EventRepository eventRepository;

    private final TicketRepository ticketRepository;

    private final BookingRepository bookingRepository;

    private final TicketCategoryRepository categoryRepository;

    @Value("${event-management.s3.tickets.bucketName}")
    private String bucketName;

    private final AmazonS3 s3Client = AmazonS3ClientBuilder.standard()
            .withCredentials(new InstanceProfileCredentialsProvider(false))
            .withRegion(Regions.EU_WEST_1)
            .build();

    private final TicketDocumentService ticketDocumentService;

    private final TicketDocumentRepository ticketDocumentRepository;

    @PersistenceContext(type = PersistenceContextType.TRANSACTION)
    private final EntityManager entityManager;

    public List<AvailableTicketsPerCategory> getAvailableTickets(Long id) {
        Optional<Event> event = eventRepository.findById(id);
        if (event.isEmpty()) {
            throw new NoSuchElementException("There is no event with id " + id);
        }
        return event.get().getTicketCategories().stream().map(category -> new AvailableTicketsPerCategory(category.getId(), category.getTitle(), category.getTickets() == null ? 0 : (long) category.getTickets().size(), (long) category.getTicketsPerCategory() - (category.getTickets() == null ? 0 : (long) category.getTickets().size()))).collect(Collectors.toList());

    }

    public InputStream getPdf(long id) {
        Optional<Ticket> ticketOptional = this.ticketRepository.findById(id);
        return s3Client.getObject(bucketName, id + ".pdf").getObjectContent();
    }

    public Page<TicketView> filterTickets(Pageable pageable, String user, String title, LocalDate startDate, LocalDate endDate) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<TicketView> q = criteriaBuilder.createQuery(TicketView.class);
        Root<TicketView> c = q.from(TicketView.class);
        List<Predicate> predicate = new ArrayList<>();
        if (title != null) {
            Expression<String> path = c.get("event_title");
            Expression<String> upper = criteriaBuilder.upper(path);
            predicate.add(criteriaBuilder.like(upper, "%" + title.toUpperCase() + "%"));
        }
        if (startDate != null && endDate != null) {
            Predicate firstCase = criteriaBuilder.between(c.get("startDate"), startDate, endDate);
            Predicate secondCase = criteriaBuilder.between(c.get("endDate"), startDate, endDate);
            Predicate thirdCase = criteriaBuilder.greaterThan(c.get("endDate"), endDate);
            Predicate fourthCase = criteriaBuilder.lessThan(c.get("startDate"), startDate);
            Predicate fifthCase = criteriaBuilder.and(thirdCase, fourthCase);
            predicate.add(criteriaBuilder.or(firstCase, secondCase, fifthCase));
        }

        predicate.add(criteriaBuilder.equal(c.get("user"), user));
        Predicate finalPredicate = criteriaBuilder.and(predicate.toArray(new Predicate[0]));
        q.where(finalPredicate);
        TypedQuery<TicketView> typedQuery = entityManager.createQuery(q);
        typedQuery.setFirstResult((int) pageable.getOffset());
        typedQuery.setMaxResults(pageable.getPageSize());
        List<TicketView> result = typedQuery.getResultList();

        CriteriaQuery<Long> sc = criteriaBuilder.createQuery(Long.class);
        Root<TicketView> rootSelect = sc.from(TicketView.class);
        sc.select(criteriaBuilder.count(rootSelect));
        sc.where(finalPredicate);
        Long count = entityManager.createQuery(sc).getSingleResult();
        return new PageImpl<>(result, pageable, count);
    }

    public Ticket validateTicket(long idEvent, long idTicket) throws TicketValidateException, TicketCorrespondingEventException {
        Optional<Ticket> ticketOptional = ticketRepository.findById(idTicket);

        if (ticketOptional.isPresent()) {
            Ticket ticket = ticketOptional.get();
            TicketDocument ticketDocument = ticketDocumentService.findByTicket(ticket);

            if (ticketDocument.isValidate()) {
                throw new TicketValidateException("Ticket with id = " + idTicket + " has already been validated");
            } else {
                Event event = eventRepository.findEventByTicket(idTicket);
                if (event.getId() != idEvent) {
                    throw new TicketCorrespondingEventException("Ticket with id = " + idTicket + " is not for this event");
                }
                ticketDocument.setValidate(true);
                ticketDocumentRepository.save(ticketDocument);
                return ticket;
            }
        } else {
            throw new NoSuchElementException("There is no ticket with id = " + idTicket);
        }
    }

    public List<Ticket> findAll(){
        return ticketRepository.findAll();
    }

    public Ticket save(Ticket ticket){
        return ticketRepository.save(ticket);
    }

    public String saveCsv(MultipartFile csv) throws IOException {
        var inputStream = csv.getInputStream();

        var reader = new BufferedReader(new InputStreamReader(inputStream));

        reader.readLine(); // skip header
        StringBuffer errorString = new StringBuffer();

        while(reader.ready()){
            String line = reader.readLine();
            var fields = line.split(",");

            var name = fields[0];
            var email = fields[1];
            var categoryId = fields[2];
            var bookingId = fields[3];

            try{
                Long.parseLong(bookingId);
                Long.parseLong(categoryId);
            }
            catch (NumberFormatException e){
                errorString.append("Id must be number, skipping row\n");
                continue;
            }
            var booking = bookingRepository.findById(Long.parseLong(bookingId));
            var category = categoryRepository.findById(Long.parseLong(categoryId));

            if(booking.isEmpty()){
                errorString.append("Invalid booking, skipping row\n");
                continue;
            }
            if(category.isEmpty()){
                errorString.append("Invalid ticket category, skipping row\n");
                continue;
            }

            var ticket = new Ticket();

            if(name.equals("")) {
                errorString.append("Invalid name, skipping row\n");
                continue;
            }
            ticket.setName(name);

            if(email.equals("")) {
                errorString.append("Invalid email, skipping row\n");
                continue;
            }
            ticket.setEmailAddress(email);

            ticket.setTicketCategory(category.get());
            ticket.setBooking(booking.get());

            this.save(ticket);
        }
        if(errorString.toString().equals("")){
            errorString.append("Success");
        }

        return errorString.toString();
    }

    public InputStreamResource writeCsv() throws FileNotFoundException {
        var tickets = this.findAll();

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
        headers.add("bookingDate");
        headers.add("bookingUser");
        headers.add("bookingEventId");

        var date = new SimpleDateFormat("yyyy-MM-dd-hh-mm-ss").format(new Date());
        var filename = "TicketCSV" + date + ".csv";

        try {
            var writer = new FileWriter(filename);
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

                writer.write(Integer.toString(category.getTicketsPerCategory()));
                writer.write(',');

                writer.write(String.valueOf(category.isAvailable()));
                writer.write(',');

                writer.write(String.valueOf(category.getEvent().getId()));
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

        return new InputStreamResource(new FileInputStream(filename));
    }
}
