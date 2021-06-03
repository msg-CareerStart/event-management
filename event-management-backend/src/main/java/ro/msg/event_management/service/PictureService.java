package ro.msg.event_management.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ro.msg.event_management.entity.Picture;
import ro.msg.event_management.repository.PictureRepository;

@Service
@RequiredArgsConstructor
public class PictureService {

    private final PictureRepository pictureRepository;

    public void savePicture(Picture picture) {
        pictureRepository.save(picture);
    }

    public Picture findOne(Long id){
        var pic = pictureRepository.findById(id);
        return pic.orElse(null);
    }
}