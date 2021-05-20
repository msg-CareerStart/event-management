package ro.msg.event_management.controller.converter;

import org.springframework.stereotype.Component;
import ro.msg.event_management.controller.dto.CardsEventDto;
import ro.msg.event_management.entity.view.EventView;

@Component
public class CardsEventConverter implements Converter<EventView, CardsEventDto> {
    @Override
    public CardsEventDto convert(EventView eventView) {
        return CardsEventDto.builder()
                .id(eventView.getId())
                .title(eventView.getTitle())
                .occupancyRate(eventView.getRate())
                .startDate(eventView.getStartDate())
                .endDate(eventView.getEndDate())
                .location(eventView.getLocation())
                .pictureUrl(eventView.getPictureUrl())
                .build();
    }
}
