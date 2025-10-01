export interface OrderItem {
  productId: number;
  quantity: number;
}

export interface Order {
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
}