package ro.msg.event_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ro.msg.event_management.entity.UserForm;

import java.util.List;

public interface UserFormRepository extends JpaRepository<UserForm, Long>{
    UserForm findByUserName(String userName);

    @Query(value="SELECT * FROM user_form u WHERE u.send_notification=true inner join notification n on n.used_id = u.id where u.occupancy_rate<=?1 and n.event_id = ?2", nativeQuery = true)
    List<UserForm> findForNotification(float rate, long id);

}