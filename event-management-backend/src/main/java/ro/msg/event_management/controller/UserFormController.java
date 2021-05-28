package ro.msg.event_management.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ro.msg.event_management.controller.converter.UserFormReverseConverter;
import ro.msg.event_management.controller.dto.LocationDto;
import ro.msg.event_management.controller.dto.UserFormDto;
import ro.msg.event_management.entity.UserForm;
import ro.msg.event_management.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@CrossOrigin
public class UserFormController {

    private final UserService userService;
    private final UserFormReverseConverter userFormReverseConverter;

    @GetMapping(value="/{username}")
    //@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    public ResponseEntity<UserFormDto> getUser(@PathVariable String username){
        UserFormDto userFormDto = userFormReverseConverter.convert(this.userService.findByUserName(username));
        return new ResponseEntity<>(userFormDto, HttpStatus.OK);
    }

    @PostMapping(value="/insert")
    //@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    public UserForm addUserForm(@RequestBody UserFormDto userFormDto)
    {
        return userService.addUserForm(userFormDto);
    }

    @PutMapping(value="/user/{id}")
    //@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    public UserFormDto updateUserForm(@PathVariable Long id, @RequestBody UserFormDto userFormUpdateDto)
    {
        return userService.update(id, userFormUpdateDto);
    }

}