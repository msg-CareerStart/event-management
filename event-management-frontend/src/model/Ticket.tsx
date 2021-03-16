export default interface ReserveTicket {
  ticketCategoryTitle: string;
  name: string;
}

export interface Ticket {
  ticketId: number;
  bookingId: number;
  bookingDate: string;
  eventName: string;
  ticketCategory: string;
  name: string;
  pdfUrl: string;
}
