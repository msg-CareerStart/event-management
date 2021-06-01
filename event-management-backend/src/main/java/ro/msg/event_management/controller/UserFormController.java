package ro.msg.event_management.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.msg.event_management.controller.converter.UserFormReverseConverter;
import ro.msg.event_management.controller.dto.UserFormDto;
import ro.msg.event_management.entity.UserForm;
import ro.msg.event_management.service.UserService;

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
        System.out.println("dada");
        UserFormDto userFormDto = userFormReverseConverter.convert(this.userService.findByUserName(username));
        return new ResponseEntity<>(userFormDto, HttpStatus.OK);
    }

    @PostMapping(value="")
    //@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    public UserForm addUserForm(@RequestBody UserFormDto userFormDto)
    {
        System.out.println("poate poate");
        //validation of available username exists in frontend, used for testing in postman
        if(userService.findByUserName(userFormDto.getUserName()) == null)
            return userService.addUserForm(userFormDto);
        return null;
    }

    @PutMapping(value="/{id}")
    //@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    public UserFormDto updateUserForm(@PathVariable Long id, @RequestBody UserFormDto userFormUpdateDto)
    {
        System.out.println("nunu");
        return userService.update(id, userFormUpdateDto);
    }

}