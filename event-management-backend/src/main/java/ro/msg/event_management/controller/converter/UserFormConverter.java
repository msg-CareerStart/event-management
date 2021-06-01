package ro.msg.event_management.controller.converter;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import ro.msg.event_management.controller.dto.UserFormDto;
import ro.msg.event_management.entity.UserForm;

@Component
@AllArgsConstructor
public class UserFormConverter implements Converter<UserFormDto, UserForm> {

    @Override
    public UserForm convert(UserFormDto obj){
        return UserForm.builder()
                .firstName(obj.getFirstName())
                .lastName(obj.getLastName())
                .userName(obj.getUserName())
                .email(obj.getEmail())
                .occupancyRate(obj.getOccupancyRate())
                .sendNotification(obj.isSendNotification())
                .build();
    }

}