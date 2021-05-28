package ro.msg.event_management.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.msg.event_management.controller.converter.UserFormConverter;
import ro.msg.event_management.controller.dto.UserFormDto;
import ro.msg.event_management.entity.Location;
import ro.msg.event_management.entity.UserForm;
import ro.msg.event_management.repository.UserFormRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserFormRepository userFormRepository;
    private final UserFormConverter userFormConverter;

    public UserForm findByUserName(String userName){
        UserForm object = userFormRepository.findByUserName(userName);
        return object;
    }

    public UserForm addUserForm(UserFormDto userFormDto)
    {
        UserForm userForm = userFormConverter.convert(userFormDto);
        this.userFormRepository.save(userForm);
        return userForm;
    }

    public List<UserForm> getUsers() {
        return this.userFormRepository.findAll();
    }

    public UserFormDto update(Long id, UserFormDto userFormDto)
    {

        UserForm userForm = userFormConverter.convert(userFormDto);
        userForm.setId(id);
        userFormRepository.save(userForm);
        return userFormDto;
    }

}