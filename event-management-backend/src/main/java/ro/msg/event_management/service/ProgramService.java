package ro.msg.event_management.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ro.msg.event_management.repository.ProgramRepository;

@Service
@RequiredArgsConstructor
public class ProgramService {

    private final ProgramRepository programRepository;
}
