export interface Product {
  id?: number;
  name: string;
  model?: string;
  description: string;
  price: number;
  category: string;
  type?: string;
  ratio?: string;
  power?: string;
  material?: string;
  features?: string;
  imageUrl?: string;
  stock?: number;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}