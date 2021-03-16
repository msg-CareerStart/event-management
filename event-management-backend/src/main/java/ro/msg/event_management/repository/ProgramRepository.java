package ro.msg.event_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.msg.event_management.entity.Program;

public interface ProgramRepository extends JpaRepository<Program, Long> {
}
