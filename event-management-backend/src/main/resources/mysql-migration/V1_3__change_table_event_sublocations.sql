ALTER TABLE `event_sublocation`
    DROP COLUMN `id`;

#ALTER TABLE `event_sublocation`
    #DROP PRIMARY KEY;

ALTER TABLE `event_sublocation`
    DROP COLUMN `start_date`;

ALTER TABLE `event_sublocation`
    DROP COLUMN `end_date`;

ALTER TABLE `event_sublocation` MODIFY COLUMN `event` bigint NOT NULL;
ALTER TABLE `event_sublocation` MODIFY COLUMN `sublocation` bigint NOT NULL;

ALTER TABLE `event_sublocation`
    ADD CONSTRAINT PK_event_sublocation PRIMARY KEY (`event`,`sublocation`);