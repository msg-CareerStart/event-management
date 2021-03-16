package ro.msg.event.management.eventmanagementbackend.entity;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "ticket")
public class Ticket extends BaseEntity {

    private String name;

    private String emailAddress;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "booking")
    private Booking booking;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ticket_category")
    private TicketCategory ticketCategory;

    @OneToOne(mappedBy = "ticket",
            cascade = CascadeType.ALL,
            optional = true,
            fetch = FetchType.LAZY)
    private TicketDocument ticketDocument;
}
