package ro.msg.event.management.eventmanagementbackend.controller.converter;

import org.springframework.stereotype.Component;
import ro.msg.event.management.eventmanagementbackend.controller.dto.SublocationDto;
import ro.msg.event.management.eventmanagementbackend.entity.Sublocation;

@Component
public class SublocationReverseConverter implements Converter<Sublocation, SublocationDto> {
    @Override
    public SublocationDto convert(Sublocation sublocation) {
        return SublocationDto.builder()
                .id(sublocation.getId())
                .name(sublocation.getName())
                .maxCapacity(sublocation.getMaxCapacity())
                .build();
    }
}
