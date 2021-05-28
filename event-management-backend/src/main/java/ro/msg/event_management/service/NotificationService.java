package ro.msg.event_management.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import ro.msg.event_management.controller.dto.UserFormDto;
import ro.msg.event_management.entity.*;
import ro.msg.event_management.repository.EventRepository;
import ro.msg.event_management.repository.NotificationRepository;
import ro.msg.event_management.repository.UserFormRepository;
import ro.msg.event_management.security.User;

import javax.mail.MessagingException;
import java.io.IOException;
import java.time.format.DateTimeFormatter;
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

    public void notifyUsers(long eventID)
    {
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
            rate = (float)reserved/(float)total;
            List<UserForm> verifyToNotify = userFormRepository.findForNotification(rate,eventID);
            for(UserForm element: verifyToNotify)
            {
                this.sendEmail(element,obj);
                notificationRepository.deleteNotificationByUserIDAndEventID(element.getId(), eventID);
            }
        }
    }

    public void sendEmail(UserForm element, Event obj)
    {
        
    }

    public Notification addNotification(long userID, long eventID)
    {
        Notification notification = new Notification(new NotificationId(userID,eventID), userID, eventID);
        this.notificationRepository.save(notification);
        return notification;
    }

}