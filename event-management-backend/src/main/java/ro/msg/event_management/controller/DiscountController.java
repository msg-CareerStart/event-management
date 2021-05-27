package ro.msg.event_management.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ro.msg.event_management.controller.dto.CheckDiscountDto;
import ro.msg.event_management.service.DiscountService;

@RestController
@AllArgsConstructor
@RequestMapping("/discount")
@CrossOrigin
public class DiscountController {

    private final DiscountService discountService;

    @GetMapping("/check")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<CheckDiscountDto> checkDiscount(@RequestBody CheckDiscountDto checkDiscountDto) {
        return new ResponseEntity<>(discountService.checkDiscount(checkDiscountDto), HttpStatus.OK);
    }

}
