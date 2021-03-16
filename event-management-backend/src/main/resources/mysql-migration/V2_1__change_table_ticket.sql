ALTER TABLE `ticket`
    ADD COLUMN `ticket_category` bigint;

ALTER TABLE `ticket`
    ADD FOREIGN KEY (`ticket_category`) references `ticket_category`(`id`);