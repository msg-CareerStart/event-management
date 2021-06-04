ALTER TABLE `picture`
    ADD FOREIGN KEY (`event`) REFERENCES `event`(`id`);

ALTER TABLE `event_sublocation`
    ADD FOREIGN KEY (`event`) REFERENCES `event`(`id`);

ALTER TABLE `booking`
    ADD FOREIGN KEY (`event`) REFERENCES `event`(`id`);

ALTER TABLE `ticket`
    ADD FOREIGN KEY (`booking`) REFERENCES `booking`(`id`);

ALTER TABLE `ticket_document`
    ADD FOREIGN KEY (`id`) REFERENCES `ticket`(`id`);

ALTER TABLE `event_sublocation`
    ADD FOREIGN KEY (`sublocation`) REFERENCES `sublocation`(`id`);

ALTER TABLE `sublocation`
    ADD FOREIGN KEY (`location`) REFERENCES `location`(`id`);

ALTER TABLE `program`
    ADD FOREIGN KEY (`location`) REFERENCES `location`(`id`);
