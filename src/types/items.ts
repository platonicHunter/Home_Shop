export interface Category {
  id: string;
  name: string;
}

export interface Item {
  id: string;
  name: string;
  category_id: string | null;
  categories?: Category;
  base_price: number;
  unit: string;
  created_at: string;
}