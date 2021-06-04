CREATE TABLE IF NOT EXISTS `picture` (

                                                  `id` long NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                                  `url` varchar(200),
                                                  `event` long

);

CREATE TABLE IF NOT EXISTS `event` (

                                          `id` long NOT NULL AUTO_INCREMENT PRIMARY KEY,
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
                                          `creator` long

);

CREATE TABLE IF NOT EXISTS `event_sublocation` (

                                          `id` long NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                          `start_date` datetime,
                                          `end_date` datetime,
                                          `sublocation` long,
                                          `event` long

);

CREATE TABLE IF NOT EXISTS `sublocation` (

                                          `id` long NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                          `name` varchar(200),
                                          `max_capacity` int,
                                          `location` long
);

CREATE TABLE IF NOT EXISTS `location` (

                                          `id` long NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                          `name` varchar(200),
                                          `address` varchar(200),
                                          `latitude` real,
                                          `longitude` real


);

CREATE TABLE IF NOT EXISTS `program` (

                                          `id` long NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                          `weekday` tinyint,
                                          `start_hour` time,
                                          `end_hour` time,
                                          `location` long

);

CREATE TABLE IF NOT EXISTS `ticket` (

                                          `id` long NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                          `name` varchar(200),
                                          `email_address` varchar(200),
                                          `booking` long

);

CREATE TABLE IF NOT EXISTS `ticket_document` (

                                          `id` long NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                          `pdf_url` varchar(200),
                                          `validate` bit

);

CREATE TABLE IF NOT EXISTS `booking` (

                                          `id` long NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                          `booking_date` datetime,
                                          `user` long,
                                          `event` long

);