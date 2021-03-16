ALTER TABLE `event`
    MODIFY COLUMN  `start_date` date;
ALTER TABLE `event`
    MODIFY COLUMN  `end_date` date;

ALTER TABLE `event`
 ADD `start_hour` time;

ALTER TABLE `event`
 ADD `end_hour` time;

CREATE OR REPLACE VIEW event_view AS
SELECT
  event.id,
  event.title,
  event.subtitle,
  event.status,
  event.highlighted,
  location.name as location,
  event.start_date,
  event.end_date,
  event.start_hour,
  event.end_hour,
  event.max_people,
  event.description,
  picture_join.url as picture_url,
  CAST(CAST(COUNT(DISTINCT ticket.id) AS FLOAT)/CAST(event.max_people AS FLOAT)*100 AS DECIMAL(16,2)) as rate
FROM
  event
  LEFT OUTER JOIN event_sublocation ON event.id = event_sublocation.event_id
  LEFT OUTER JOIN sublocation ON event_sublocation.sublocation_id = sublocation.id
  LEFT OUTER JOIN location ON sublocation.location = location.id
  LEFT OUTER JOIN booking ON event.id = booking.event
  LEFT OUTER JOIN ticket ON booking.id = ticket.booking
  LEFT OUTER JOIN (select picture.id,picture.url,picture.event, MIN(picture.id) from picture join event as event1 on picture.event = event1.id group by picture.event) as picture_join ON event.id = picture_join.event
GROUP BY
--  ticket.booking,
  event.id,picture_join.url;

