import { CategoryCardItem } from "./TicketType";

export interface EventCrud {
  id: number;
  title: string;
  subtitle: string;
  status: boolean;
  highlighted: boolean;
  description: string;
  observations: string;
  location: number;
  startDate: string;
  endDate: string;
  startHour: string;
  endHour: string;
  maxPeople: number | string;
  picturesUrlSave: any[];
  picturesUrlDelete: any[];
  noTicketEvent: boolean;
  ticketsPerUser: number;
  ticketCategoryDtoList: CategoryCardItem[];
  ticketCategoryToDelete: number[];
  ticketInfo: string;
}
