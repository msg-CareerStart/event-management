CREATE TABLE IF NOT EXISTS `picture` (

                                                  `id` bigint NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                                  `url` varchar(200),
                                                  `event` bigint

);

CREATE TABLE IF NOT EXISTS `event` (

                                          `id` bigint NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                          `title` varchar(200),
                                          `subtitle` varchar(200),
                                          `status` bit,
                                          `start_date` datetime,
                                          `end_date` datetime,
                                          `max_people` int,
                                          `description` text,
                                          `highlighted` bit,
                                          `observations` text,
                                          `no_ticket_event` bit,
                                          `creator` bigint

);

CREATE TABLE IF NOT EXISTS `event_sublocation` (

                                          `id` bigint NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                          `start_date` datetime,
                                          `end_date` datetime,
                                          `sublocation` bigint,
                                          `event` bigint

);

CREATE TABLE IF NOT EXISTS `sublocation` (

                                          `id` bigint NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                          `name` varchar(200),
                                          `max_capacity` int,
                                          `location` bigint
);

CREATE TABLE IF NOT EXISTS `location` (

                                          `id` bigint NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                          `name` varchar(200),
                                          `address` varchar(200),
                                          `latitude` real,
                                          `longitude` real


);

CREATE TABLE IF NOT EXISTS `program` (

                                          `id` bigint NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                          `weekday` tinyint,
                                          `start_hour` time,
                                          `end_hour` time,
                                          `location` bigint

);

CREATE TABLE IF NOT EXISTS `ticket` (

                                          `id` bigint NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                          `name` varchar(200),
                                          `email_address` varchar(200),
                                          `booking` bigint

);

CREATE TABLE IF NOT EXISTS `ticket_document` (

                                          `id` bigint NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                          `pdf_url` varchar(200),
                                          `validate` bit

);

CREATE TABLE IF NOT EXISTS `booking` (

                                          `id` bigint NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                          `booking_date` datetime,
                                          `user` bigint,
                                          `event` bigint

);

CREATE TABLE IF NOT EXISTS `user_form` (
                                           `id` bigint NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                           `first_name` varchar(200),
    `last_name` varchar(200),
    `user_name` varchar(200),
    `email` varchar(200),
    `occupancy_rate` float,
    `send_notification` boolean
    );

CREATE TABLE IF NOT EXISTS `notification` (
                                              `user_id` bigint,
                                              `event_id` bigint,
                                              CONSTRAINT `id_notification` PRIMARY KEY(`user_id`, `event_id`)
    );