package ro.msg.event_management.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ro.msg.event_management.controller.dto.CheckDiscountDto;
import ro.msg.event_management.controller.dto.DiscountDto;
import ro.msg.event_management.entity.DiscountDetailsView;
import ro.msg.event_management.service.DiscountService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/discount")
@CrossOrigin
public class DiscountController {

    private final DiscountService discountService;

    @PostMapping("/check")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<CheckDiscountDto> checkDiscount(@RequestBody CheckDiscountDto checkDiscountDto) {
        return new ResponseEntity<>(discountService.checkDiscount(checkDiscountDto), HttpStatus.OK);
    }


    @GetMapping("/forEvent/{id}")
    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    public ResponseEntity<List<DiscountDetailsView>> getDiscountsForEvent(@PathVariable long id)
    {
        List<DiscountDetailsView> discountForEvent = discountService.getDiscountsForEvent(id);
        return new ResponseEntity<>(discountForEvent, HttpStatus.OK);
    }
}
