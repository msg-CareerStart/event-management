import { LocationType } from '../LocationType';

export interface EventCard {
  id: number;
  title: string;
  occupancyRate: number;
  startDate: string;
  endDate: string;
  startHour: string;
  endHour: string;
  location: string;
  locationDto: LocationType;
}
