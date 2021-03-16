package ro.msg.event_management.controller.dto;

import java.util.List;

import lombok.Data;

@Data
public class PictureS3Dto {
    private List<String> picturesToDelete;
    private List<String> picturesToSave;
}
