export default class Order {
  id: number;
  companyId: number;
  created: string;
  createdBy: string;
  paymentMethod: string;
  totalPrice: number;
  status: number;
  orderRows: OrderRow[];
}

export class OrderRow {
  productId: number;
  amount: number;
}
