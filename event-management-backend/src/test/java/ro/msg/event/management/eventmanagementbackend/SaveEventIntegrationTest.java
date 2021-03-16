package ro.msg.event.management.eventmanagementbackend;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import javax.transaction.Transactional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import ro.msg.event.management.eventmanagementbackend.controller.converter.Converter;
import ro.msg.event.management.eventmanagementbackend.controller.converter.EventReverseConverter;
import ro.msg.event.management.eventmanagementbackend.controller.dto.EventDto;
import ro.msg.event.management.eventmanagementbackend.controller.dto.TicketCategoryDto;
import ro.msg.event.management.eventmanagementbackend.entity.Event;
import ro.msg.event.management.eventmanagementbackend.entity.Picture;
import ro.msg.event.management.eventmanagementbackend.exception.ExceededCapacityException;
import ro.msg.event.management.eventmanagementbackend.exception.OverlappingEventsException;
import ro.msg.event.management.eventmanagementbackend.service.EventService;

@SpringBootTest
@Transactional
@ActiveProfiles("test")
public class SaveEventIntegrationTest {

    @Autowired
    private EventService eventService;

    @Autowired
    private Converter<EventDto, Event> convertToEntity;



    @Test
    void testSaveEvent() {


        List<String> picturesUrlSave = new ArrayList<>();
        picturesUrlSave.add("url1");
        picturesUrlSave.add("url2");

        TicketCategoryDto ticketCategoryDto = TicketCategoryDto.builder()
                .title("titleCategory")
                .subtitle("subtitle")
                .price((float) 3.4)
                .description("desc")
                .ticketsPerCategory(2)
                .build();

        List<TicketCategoryDto> ticketCategoryDtoList = new ArrayList<>();
        ticketCategoryDtoList.add(ticketCategoryDto);


        EventDto eventDto = EventDto.builder()
                .title("title")
                .subtitle("subtitle")
                .description("description")
                .observations("-")
                .status(true)
                .ticketsPerUser(10)
                .highlighted(false)
                .maxPeople(30)
                .startDate(LocalDate.now())
                .endDate(LocalDate.now())
                .startHour(LocalTime.now())
                .endHour(LocalTime.now().plusHours(3))
                .creator("")
                .picturesUrlSave(picturesUrlSave)
                .ticketCategoryDtoList(ticketCategoryDtoList)
                .location(1)
                .ticketInfo("ticket info")
                .build();


        long locationId = 1;



        Event event = ((EventReverseConverter) convertToEntity).convertForUpdate(eventDto, false);


        try {
            Event testEvent = eventService.saveEvent(event,locationId);

            assertEquals(event, testEvent);

            List<String> testUrls = testEvent.getPictures().stream()
                    .map(Picture::getUrl).collect(Collectors.toList());

            assertEquals(picturesUrlSave, testUrls);


        } catch (OverlappingEventsException | ExceededCapacityException e) {
            e.printStackTrace();
        }


    }

}
