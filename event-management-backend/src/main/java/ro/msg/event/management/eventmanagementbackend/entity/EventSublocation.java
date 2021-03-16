package ro.msg.event.management.eventmanagementbackend.entity;

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class EventSublocation {

    @AttributeOverrides({
            @AttributeOverride(name = "event", column = @Column(name = "event_id")),
            @AttributeOverride(name = "sublocation", column = @Column(name = "sublocation_id"))
    })

    @EmbeddedId
    private EventSublocationID eventSublocationID;

    @MapsId(value = "event")
    @ManyToOne
    private Event event;

    @MapsId(value = "sublocation")
    @ManyToOne
    private Sublocation sublocation;

    public EventSublocation(Event event, Sublocation sublocation){
        this.event = event;
        this.sublocation= sublocation;
    }

}
