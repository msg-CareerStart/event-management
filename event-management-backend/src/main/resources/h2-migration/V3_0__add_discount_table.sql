CREATE TABLE IF NOT EXISTS `discount` (
                                          `id` long NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                          `code` varchar(200),
                                          `percentage` int check (percentage >= 1 AND percentage <= 100),
                                          `start_date` date,
                                          `end_date` date,
                                          `ticket_category` long
);

ALTER TABLE `discount`
    ADD FOREIGN KEY (`ticket_category`) REFERENCES `ticket_category`(`id`);