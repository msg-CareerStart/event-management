package ro.msg.event_management.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class LocationStatistics {
    private long idLocation;
    private List<EventStatistics> eventStatistics;
}

