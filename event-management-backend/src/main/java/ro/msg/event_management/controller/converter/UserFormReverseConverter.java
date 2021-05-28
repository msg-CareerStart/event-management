
package ro.msg.event_management.controller.converter;

import org.springframework.stereotype.Component;
import ro.msg.event_management.controller.dto.UserFormDto;
import ro.msg.event_management.entity.UserForm;

@Component
public class UserFormReverseConverter implements Converter<UserForm, UserFormDto>{
    @Override
    public UserFormDto convert(UserForm userForm){
        return UserFormDto.builder()
                .id(userForm.getId())
                .firstName(userForm.getFirstName())
                .lastName(userForm.getLastName())
                .userName(userForm.getUserName())
                .email(userForm.getEmail())
                .occupancyRate(userForm.getOccupancyRate())
                .sendNotification(userForm.isSendNotification())
                .build();
    }
}