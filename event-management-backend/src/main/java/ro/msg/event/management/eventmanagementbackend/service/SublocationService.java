package ro.msg.event.management.eventmanagementbackend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ro.msg.event.management.eventmanagementbackend.entity.Sublocation;
import ro.msg.event.management.eventmanagementbackend.repository.SublocationRepository;

@Service
@RequiredArgsConstructor
public class SublocationService {

    private final SublocationRepository sublocationRepository;

    public Sublocation findById(long id) {
        return sublocationRepository.getOne(id);
    }

    public long saveSublocation(Sublocation sublocation) {
        return sublocationRepository.save(sublocation).getId();
    }
}
