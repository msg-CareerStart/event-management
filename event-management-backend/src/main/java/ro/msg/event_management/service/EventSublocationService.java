package ro.msg.event_management.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ro.msg.event_management.entity.EventSublocation;
import ro.msg.event_management.repository.EventSublocationRepository;

@Service
@RequiredArgsConstructor
public class EventSublocationService {

    private final EventSublocationRepository eventSublocationRepository;

    public void saveES(EventSublocation eventSublocation) {
        eventSublocationRepository.save(eventSublocation);
    }
}
