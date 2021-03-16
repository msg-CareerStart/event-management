CREATE TABLE IF NOT EXISTS `ticket_category` (

                                         `id` long NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                         `title` varchar(200),
                                         `subtitle` varchar(200),
                                         `price` real,
                                         `description` varchar(200),
                                         `tickets_per_category` int,
                                         `event` long
);

ALTER TABLE `ticket_category`
    ADD FOREIGN KEY (`event`) REFERENCES `event`(`id`);