CREATE OR REPLACE VIEW ticket_view AS
SELECT
  ticket.id as ticket_id,
  ticket.booking as booking_id,
  booking.booking_date,
  ticket_category.title as category,
  ticket.name,
  ticket_document.pdf_url,
  booking.user,
  event.start_date,
  event.end_date,
  event.title as event_title
FROM
  ticket
  LEFT OUTER JOIN booking ON ticket.booking = booking.id
  LEFT OUTER JOIN ticket_category ON ticket.ticket_category = ticket_category.id
  LEFT OUTER JOIN ticket_document ON ticket.id = ticket_document.id
  LEFT OUTER JOIN event ON ticket_category.event = event.id
