package ro.msg.event.management.eventmanagementbackend.entity.view;

import java.time.LocalDate;
import java.time.LocalTime;
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
public class EventView {

    @Id
    @Column(updatable = false, nullable = false)
    private Long id;

    @Column
    private String title;

    @Column
    private String subtitle;

    @Column
    private Boolean status;

    @Column
    private Boolean highlighted;

    @Column
    private String location;

    @Column
    private LocalDate startDate;

    @Column
    private LocalDate endDate;

    @Column
    private LocalTime startHour;

    @Column
    private LocalTime endHour;

    @Column
    private Integer maxPeople;

    @Column
    private Float rate;

    @Column
    private String pictureUrl;

    @Column
    private String description;

}
