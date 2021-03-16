package ro.msg.event_management.exception;

public class InvalidJWTException extends RuntimeException {
    public InvalidJWTException(String errorMessage) {
        super(errorMessage);
    }
}
