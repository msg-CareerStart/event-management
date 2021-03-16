package ro.msg.event.management.eventmanagementbackend.service;


import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import com.amazonaws.auth.InstanceProfileCredentialsProvider;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;
import ro.msg.event.management.eventmanagementbackend.entity.Ticket;
import ro.msg.event.management.eventmanagementbackend.mail.Mail;

@Service
public class EmailSenderService {

    private JavaMailSender javaMailSender;

    private SpringTemplateEngine templateEngine;


    private final AmazonS3 s3Client = AmazonS3ClientBuilder.standard()
            .withCredentials(new InstanceProfileCredentialsProvider(false))
            .withRegion(Regions.EU_WEST_1)
            .build();

    @Value("${event-management.s3.tickets.bucketName}")
    private String bucketName;

    @Value("${fromMail}")
    private String fromMail;

    public EmailSenderService(JavaMailSender javaMailSender, SpringTemplateEngine templateEngine) {
        this.javaMailSender = javaMailSender;
        this.templateEngine = templateEngine;
    }

    @Async
    public void sendEmail(Mail mail) throws MessagingException, IOException {
        MimeMessage message = getMimeMessage(mail);
        javaMailSender.send(message);
    }

    private MimeMessage getMimeMessage(Mail mail) throws MessagingException, IOException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper =
                new MimeMessageHelper(
                        message,
                        MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                        StandardCharsets.UTF_8.name());

        Context context = new Context();
        context.setVariables(mail.getModel());
        String html = templateEngine.process("cool-email", context);

        helper.setTo(mail.getTo());
        helper.setText(html, true);
        helper.setSubject(mail.getSubject());
        helper.setFrom(mail.getFrom());
        HashMap<String, List<Ticket>> hashMap =  (HashMap<String,List<Ticket>>)mail.getModel().get("ticketsWithLists");
        for (List<Ticket> list : hashMap.values()){
            for (Ticket ticket : list){
                String documentUrl = ticket.getId()+".pdf";
                S3Object object = s3Client.getObject(bucketName, documentUrl);
                S3ObjectInputStream s3is = object.getObjectContent();
                helper.addAttachment("ticket"+ ticket.getName()+".pdf", new ByteArrayResource(IOUtils.toByteArray(s3is)));
            }
        }
        return message;
    }

    public Mail getMail(Map<String, Object> model, String email) {
        Mail mail = new Mail();
        mail.setFrom(fromMail);
        mail.setTo(email);
        mail.setSubject("Confirmare achizitionare bilete");
        mail.setModel(model);
        return mail;
    }
}