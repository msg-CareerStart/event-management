package ro.msg.event.management.eventmanagementbackend.controller.dto;

import lombok.Data;

import java.util.List;

@Data
public class PictureS3Dto {
    private List<String> picturesToDelete;
    private List<String> picturesToSave;
}