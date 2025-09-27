// Product-related type definitions

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  reviews: number;
  description: string;
  discount: number;
}

// You can add more product-related types here in the future
// export interface ProductCategory { ... }
// export interface ProductReview { ... }