import { MathRelation } from './MathRelation';

export interface EventFilters {
  title: string;
  subtitle: string;
  status: string;
  highlighted: boolean | undefined;
  location: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  startHour: string | undefined;
  endHour: string | undefined;
  rate: number | string;
  rateSign: MathRelation;
  maxPeople: number | string;
  maxPeopleSign: MathRelation;
}
