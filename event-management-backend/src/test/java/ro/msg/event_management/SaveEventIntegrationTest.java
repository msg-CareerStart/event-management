package ro.msg.event_management;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import javax.transaction.Transactional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import ro.msg.event_management.controller.converter.Converter;
import ro.msg.event_management.controller.converter.EventReverseConverter;
import ro.msg.event_management.controller.dto.EventDto;
import ro.msg.event_management.controller.dto.TicketCategoryDto;
import ro.msg.event_management.entity.Event;
import ro.msg.event_management.entity.Location;
import ro.msg.event_management.entity.Picture;
import ro.msg.event_management.entity.Sublocation;
import ro.msg.event_management.exception.ExceededCapacityException;
import ro.msg.event_management.exception.OverlappingEventsException;
import ro.msg.event_management.repository.*;
import ro.msg.event_management.service.EventService;

@SpringBootTest
@Transactional
@ActiveProfiles("test")
public class SaveEventIntegrationTest {

    @Autowired
    private EventService eventService;

    @Autowired
    private Converter<EventDto, Event> convertToEntity;

    @Autowired
    private SublocationRepository sublocationRepository;

    @Autowired
    private LocationRepository locationRepository;


    @Test
    void testSaveEvent() {

        Location location1 = new Location("Campus", "Obs 23", (float) 34.55, (float) 55.76, null, null);
        Sublocation sublocation1 = new Sublocation("same", 300, location1, null);
        locationRepository.save(location1);
        Sublocation s = sublocationRepository.save(sublocation1);
        location1.setSublocation(new ArrayList<Sublocation>(Arrays.asList(s)));

        Location l = locationRepository.save(location1);

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
                .ticketInfo("ticket info")
                .build();

        Event event = ((EventReverseConverter) convertToEntity).convertForUpdate(eventDto, false);

        try {
            Event testEvent = eventService.saveEvent(event,l.getId());

            assertEquals(event, testEvent);

            List<String> testUrls = testEvent.getPictures().stream()
                    .map(Picture::getUrl).collect(Collectors.toList());

            assertEquals(picturesUrlSave, testUrls);


        } catch (OverlappingEventsException | ExceededCapacityException e) {
            e.printStackTrace();
        }


    }

}
