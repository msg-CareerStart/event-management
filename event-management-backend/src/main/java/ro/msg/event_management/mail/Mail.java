package ro.msg.event_management.mail;

import java.util.Map;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Mail {
    private String from;
    private String to;
    private String subject;
    private Map<String, Object> model;
}