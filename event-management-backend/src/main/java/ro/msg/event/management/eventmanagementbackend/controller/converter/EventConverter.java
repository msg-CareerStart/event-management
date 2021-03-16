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
public class EventConverter implements Converter<Event, EventDto> {

    private final TicketCategoryReverseConverter ticketCategoryReverseConverter;

    @Override
    public EventDto convert(Event event) {
        List<String> picturesUrl = new ArrayList<>();
        if (event.getPictures() != null) {
            for (Picture picture : event.getPictures()) {
                picturesUrl.add(picture.getUrl());
            }
        }

        return EventDto.builder()
                .title(event.getTitle())
                .subtitle(event.getSubtitle())
                .description(event.getDescription())
                .observations(event.getObservations())
                .status(event.isStatus())
                .ticketsPerUser(event.getTicketsPerUser())
                .highlighted(event.isHighlighted())
                .maxPeople(event.getMaxPeople())
                .startDate(event.getStartDate())
                .endDate(event.getEndDate())
                .startHour(event.getStartHour())
                .endHour(event.getEndHour())
                .creator(event.getCreator())
                .picturesUrlSave(picturesUrl)
                .ticketCategoryDtoList(ticketCategoryReverseConverter.convertAll(event.getTicketCategories()))
                .location(event.getEventSublocations().get(0).getSublocation().getLocation().getId())
                .ticketInfo(event.getTicketInfo())
                .ticketCategoryToDelete(new ArrayList<>())
                .id(event.getId())
                .build();
    }
}
