package ro.msg.event.management.eventmanagementbackend.controller.converter;

import org.springframework.stereotype.Component;
import ro.msg.event.management.eventmanagementbackend.controller.dto.ProgramDto;
import ro.msg.event.management.eventmanagementbackend.entity.Program;

@Component
public class ProgramReverseConverter implements Converter<Program, ProgramDto> {
    @Override
    public ProgramDto convert(Program program) {
        return ProgramDto.builder()
                .id(program.getId())
                .weekday(program.getWeekday())
                .startHour(program.getStartHour() != null ? program.getStartHour().toString() : "")
                .endHour(program.getEndHour() != null ? program.getEndHour().toString() : "")
                .build();
    }
}
