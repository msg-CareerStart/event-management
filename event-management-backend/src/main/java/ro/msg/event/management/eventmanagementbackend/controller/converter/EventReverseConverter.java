package ro.msg.event.management.eventmanagementbackend.controller.converter;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import ro.msg.event.management.eventmanagementbackend.controller.dto.EventDto;
import ro.msg.event.management.eventmanagementbackend.entity.Event;
import ro.msg.event.management.eventmanagementbackend.entity.Picture;

@Component
@AllArgsConstructor
public class EventReverseConverter implements Converter<EventDto, Event> {

    private final TicketCategoryConverter ticketCategoryConverter;

    @Override
    public Event convert(EventDto eventDto) {
        Event event = Event.builder()
                .title(eventDto.getTitle())
                .subtitle(eventDto.getSubtitle())
                .observations(eventDto.getObservations())
                .ticketsPerUser(eventDto.getTicketsPerUser())
                .highlighted(eventDto.isHighlighted())
                .status(eventDto.isStatus())
                .maxPeople(eventDto.getMaxPeople())
                .creator(eventDto.getCreator())
                .description(eventDto.getDescription())
                .startDate(eventDto.getStartDate())
                .endDate(eventDto.getEndDate())
                .startHour(eventDto.getStartHour())
                .endHour(eventDto.getEndHour())
                .ticketInfo(eventDto.getTicketInfo())
                .build();

        if (eventDto.getPicturesUrlSave() != null) {
            List<Picture> pictures = new ArrayList<>();

            for (String urlPicture : eventDto.getPicturesUrlSave()) {
                Picture picture = new Picture();

                picture.setUrl(urlPicture);
                picture.setEvent(event);

                pictures.add(picture);
            }
            event.setPictures(pictures);
        }

        return event;
    }

    public Event convertForUpdate(EventDto eventDto, boolean update){
        Event event = convert(eventDto);
        if(update){
            event.setTicketCategories(ticketCategoryConverter.convertAllForUpdate(eventDto.getTicketCategoryDtoList()));
        }else{
            event.setTicketCategories(ticketCategoryConverter.convertAll(eventDto.getTicketCategoryDtoList()));
        }
        return event;
    }
}
