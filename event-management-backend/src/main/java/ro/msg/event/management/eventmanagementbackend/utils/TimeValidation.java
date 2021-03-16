package ro.msg.event.management.eventmanagementbackend.utils;

import java.time.DateTimeException;
import java.time.LocalDate;
import java.time.LocalTime;

public class TimeValidation {
    public static void validateTime(LocalDate startDate, LocalDate endDate, LocalTime startHour, LocalTime endHour) {
        if (endDate.isBefore(startDate)) {
            throw new DateTimeException("Invalid time!");
        } else {
            if (endDate.equals(startDate) && endHour.isBefore(startHour)) {
                throw new DateTimeException("Invalid time!");
            }
        }
    }
}
