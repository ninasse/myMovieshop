import Order from 'src/app/models/Order';
import { Subject } from 'rxjs';
import IOrderService from './IOrderService';

export default class MockOrderService implements IOrderService {
  orders: Order[] = [
    {
      id: 78,
      companyId: 8585,
      created: '2020-06-15 00:05:20',
      createdBy: 'Customername',
      paymentMethod: 'Credit card',
      totalPrice: 200,
      status: 1,
      orderRows: [{ productId: 78, amount: 2 }],
    },
    {
      id: 78,
      companyId: 8585,
      created: '2020-06-15 00:05:20',
      createdBy: 'Customername',
      paymentMethod: 'Credit card',
      totalPrice: 200,
      status: 1,
      orderRows: [{ productId: 78, amount: 2 }],
    },
    {
      id: 80,
      companyId: 8585,
      created: '2020-06-19 20:05:46',
      createdBy: 'Customer',
      paymentMethod: 'Kisses',
      totalPrice: 100,
      status: 1,
      orderRows: [{ productId: 78, amount: 1 }],
    },
  ];
  order: Order = {
    id: 2456,
    companyId: 8585,
    created: '2020-06-15 03:45:33',
    createdBy: 'Customer',
    paymentMethod: 'Credit Card',
    totalPrice: 200,
    status: 1,
    orderRows: [{ productId: 78, amount: 2 }],
  };
  orderListSourse: Subject<Order[]> = new Subject<Order[]>();
  orderSourse: Subject<Order> = new Subject<Order>();
  orderInDB: Order;
  orderList: Order[];
  getOrdersFromApi() {
    this.orderListSourse.next(this.orders);
    this.orderList = this.orders;
  }

  postOrder(order) {
    this.orderSourse.next(this.order);
    this.orders.push(order);
  }
  removeOrder(order: Order) {
    this.orders.splice(0, 1);
  }
}
