package ro.msg.event.management.eventmanagementbackend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ro.msg.event.management.eventmanagementbackend.repository.ProgramRepository;

@Service
@RequiredArgsConstructor
public class ProgramService {

    private final ProgramRepository programRepository;
}
