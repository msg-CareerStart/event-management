package ro.msg.event_management.entity;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor
@Data
public class EventSublocationID implements Serializable {

    @Column
    private long event;

    @Column
    private long sublocation;

}
