package ro.msg.event.management.eventmanagementbackend.controller.converter;

import org.springframework.stereotype.Component;
import ro.msg.event.management.eventmanagementbackend.controller.dto.CardsEventDto;
import ro.msg.event.management.eventmanagementbackend.entity.view.EventView;

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
                .build();
    }
}
