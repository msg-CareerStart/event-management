package ro.msg.event.management.eventmanagementbackend.security;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

/**
 * Handles security related exceptions. Provides different messages and status codes according to the type of exception
 * that was thrown.
 */
@Order(Ordered.HIGHEST_PRECEDENCE)
@ControllerAdvice
class SecurityExceptionsHandler {
    /**
     * Sends a response containing the message and the status code that match the thrown exception.
     * @param securityException either an AccessDeniedException (the user does
     *                          not have the required roles) or an AuthenticationException (the provided JWT is
     *                          either expired or invalid)
     * @return ResponseEntity containing the message and the status code
     */
    @ExceptionHandler({AccessDeniedException.class, AuthenticationException.class})
    public ResponseEntity<String> sendResponseForSecurityExceptions(Exception securityException) {
        if (securityException instanceof AccessDeniedException) {
            return new ResponseEntity<>("Access Denied", HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>("Invalid/Expired Token", HttpStatus.UNAUTHORIZED);
    }
}
