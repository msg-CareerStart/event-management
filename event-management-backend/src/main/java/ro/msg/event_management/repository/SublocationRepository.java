package ro.msg.event_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.msg.event_management.entity.Sublocation;

public interface SublocationRepository extends JpaRepository<Sublocation,Long> {

    Sublocation findByName(String name);
}
