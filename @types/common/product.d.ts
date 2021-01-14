export interface IProductImage {
  path: string;
}

// useful for client side
export interface IProduct {
  _id?: string;
  name: string;
  sku: string;
  slug: string;
  price: number;
  content: string;
  status: boolean;
  brand?: number;
  discount?: number;
  images: Array<IProductImage>;
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date | null
}
