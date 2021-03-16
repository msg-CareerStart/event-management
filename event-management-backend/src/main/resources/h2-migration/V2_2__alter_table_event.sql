ALTER TABLE `event`
    drop column `no_ticket_event`;

ALTER TABLE `event`
    add column `tickets_per_user` int;