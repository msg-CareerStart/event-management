export interface DiscountCardItem {
  id: number;
  code: string;
  percentage: number;
  startDate: string;
  endDate: string;
}

export interface DiscountPageState {
  cards: JSX.Element[];
  ecards: DiscountCardItem[];
  error: string;
}

export interface CategoryPageType {
  cards: JSX.Element[];
  ecards: DiscountCardItem[];
  error: string;
}
