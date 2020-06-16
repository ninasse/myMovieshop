import { Subject } from 'rxjs';
import Order from 'src/app/models/Order';

export default interface IOrderService {
  orderListSourse: Subject<Order[]>;
  orderSourse: Subject<Order>;
  orderInDB: Order;
  orderList: Order[];
  getOrdersFromApi(): void;

  postOrder(order): void;
}
