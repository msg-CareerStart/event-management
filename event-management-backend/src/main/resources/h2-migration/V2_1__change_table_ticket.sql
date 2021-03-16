ALTER TABLE `ticket`
    ADD COLUMN `ticket_category` long;

ALTER TABLE `ticket`
    ADD FOREIGN KEY (`ticket_category`) references `ticket_category`(`id`);