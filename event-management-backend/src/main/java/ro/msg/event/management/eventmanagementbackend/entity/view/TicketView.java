package ro.msg.event.management.eventmanagementbackend.entity.view;

import java.time.LocalDate;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Immutable;

@Entity
@Immutable
@AllArgsConstructor
@Data
@NoArgsConstructor
public class TicketView {

    @Id
    @Column(updatable = false, nullable = false)
    private Long ticketId;

    @Column
    private Long bookingId;

    @Column
    private LocalDate bookingDate;

    @Column
    private String category;

    @Column
    private String name;

    @Column
    private String pdf_url;

    @Column
    private String user;

    @Column
    private LocalDate startDate;

    @Column
    private LocalDate endDate;

    @Column
    private String event_title;
}
