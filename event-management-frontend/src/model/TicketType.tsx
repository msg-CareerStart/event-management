export interface CategoryCardItem {
  id: number;
  title: string;
  subtitle: string;
  price: number;
  description: string;
  ticketsPerCategory: number;
  available: boolean;
}

export interface CategoryPageState {
  cards: JSX.Element[];
  ecards: CategoryCardItem[];
  error: string;
}

export interface CategoryPageType {
  cards: JSX.Element[];
  ecards: CategoryCardItem[];
  error: string;
}
