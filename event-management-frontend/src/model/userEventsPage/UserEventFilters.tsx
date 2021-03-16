import { UserMathRelation } from './UserMathRelation';
import { UserEventType } from './UserEventType';

export interface UserEventFilters {
  title: string;
  locations: string[];
  rate: number;
  rateSign: UserMathRelation;
  type: UserEventType;
}
