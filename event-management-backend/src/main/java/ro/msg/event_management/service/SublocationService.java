package ro.msg.event_management.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ro.msg.event_management.entity.Sublocation;
import ro.msg.event_management.repository.SublocationRepository;

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
