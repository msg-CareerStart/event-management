import { EventCrud } from './EventCrud';

export interface EventWithLocation {
  eventDto: EventCrud;
  locationAddress: string;
  locationName: string;
}
