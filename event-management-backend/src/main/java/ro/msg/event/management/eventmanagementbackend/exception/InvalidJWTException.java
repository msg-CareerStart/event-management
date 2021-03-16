package ro.msg.event.management.eventmanagementbackend.exception;

public class InvalidJWTException extends RuntimeException {
    public InvalidJWTException(String errorMessage) {
        super(errorMessage);
    }
}
