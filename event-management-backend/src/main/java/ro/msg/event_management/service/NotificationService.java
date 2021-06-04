package ro.msg.event_management.service;

import com.itextpdf.text.DocumentException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ro.msg.event_management.entity.*;
import ro.msg.event_management.repository.EventRepository;
import ro.msg.event_management.repository.NotificationRepository;
import ro.msg.event_management.repository.UserFormRepository;

import javax.mail.MessagingException;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserFormRepository userFormRepository;
    private final EventRepository eventRepository;
    private final EmailSenderService emailSenderService;

    public void notifyUsers(long eventID) throws MessagingException, IOException {
        int reserved = 0;
        int total;
        float rate;
        Optional<Event> object = eventRepository.findById(eventID);
        if(object.isPresent())
        {
            Event obj = object.get();
            total = obj.getMaxPeople();
            for(Booking el : obj.getBookings())
            {
                reserved += el.getTickets().size();
            }
            rate = ((float)reserved/(float)total)*100;
            List<UserForm> verifyToNotify = userFormRepository.findForNotification(rate,eventID);
            for(UserForm element: verifyToNotify)
            {
                this.sendEmail(element,obj);
                notificationRepository.deleteNotificationByUserAndEvent(element.getId(), eventID);
            }
        }
    }
    @Transactional(
            rollbackFor = {FileNotFoundException.class, DocumentException.class, MessagingException.class,
                    IOException.class})
    public void sendEmail(UserForm user, Event obj) throws MessagingException, IOException {
        Map<String, Object> model = new HashMap<>();
        model.put("firstName", user.getFirstName());
        model.put("lastName", user.getLastName());
        model.put("eventName", obj.getTitle());
        model.put("rate", user.getOccupancyRate());
        emailSenderService.sendNotificationEmail(emailSenderService.getNotificationMail(model, user.getEmail()));
    }

    public Notification addNotification(long userID, long eventID)
    {
        Notification notification = new Notification(new NotificationId(userID,eventID), userFormRepository.getOne(userID), eventRepository.getOne(eventID));
        this.notificationRepository.save(notification);
        return notification;
    }

}