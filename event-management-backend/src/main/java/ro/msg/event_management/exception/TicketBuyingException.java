package ro.msg.event_management.exception;

public class TicketBuyingException extends RuntimeException {
    public TicketBuyingException(String errorMessage) {
        super(errorMessage);
    }
}

