package ro.msg.event.management.eventmanagementbackend.controller;


import java.net.URL;
import java.util.List;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ro.msg.event.management.eventmanagementbackend.controller.dto.PictureS3Dto;
import ro.msg.event.management.eventmanagementbackend.service.PictureS3Service;


@RestController
@RequestMapping("/pictures")
@CrossOrigin
@RequiredArgsConstructor
public class PictureS3Controller {

    private final PictureS3Service pictureS3Service;


    @PostMapping
    public List<URL> getPresignedUrl(@RequestBody PictureS3Dto pictureS3Dto) {

        List<String> objectKeys = pictureS3Dto.getPicturesToSave();
        List<String> picturesToDeleteUrls = pictureS3Dto.getPicturesToDelete();

        pictureS3Service.deleteFromS3(picturesToDeleteUrls);

        return pictureS3Service.getPresignedUrls(objectKeys);

    }
}
