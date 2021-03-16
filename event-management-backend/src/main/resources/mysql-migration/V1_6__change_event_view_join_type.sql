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
    event.max_people,
    CAST(CAST(COUNT(DISTINCT ticket.id) AS FLOAT)/CAST(event.max_people AS FLOAT) AS DECIMAL(16,2)) as rate
FROM
    event
        LEFT OUTER JOIN event_sublocation ON event.id = event_sublocation.event_id
        LEFT OUTER JOIN sublocation ON event_sublocation.sublocation_id = sublocation.id
        LEFT OUTER JOIN location ON sublocation.location = location.id
        LEFT OUTER JOIN booking ON event.id = booking.event
        LEFT OUTER JOIN ticket ON booking.id = ticket.booking
GROUP BY
    ticket.booking,
    event.id;