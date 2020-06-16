import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Order, { OrderRow } from 'src/app/models/Order';

import { HttpClient } from '@angular/common/http';
import IOrderService from './IOrderService';

@Injectable({
  providedIn: 'root',
})
export class OrderService implements IOrderService {
  orderAPI =
    'https://medieinstitutet-wie-products.azurewebsites.net/api/orders';
  companyID = '8585';
  orderListSourse: Subject<Order[]> = new Subject<Order[]>();
  orderSourse: Subject<Order> = new Subject<Order>();
  orderInDB: Order;
  orderList: Order[];
  submittedOrder = JSON.stringify(Order);

  constructor(private http: HttpClient) {}

  postOrder(order) {
    order = JSON.stringify(order);
    console.log('hej från Order Service!' + order);
    this.http
      .post(this.orderAPI, order, {
        headers: { 'content-type': 'application/json' },
      })
      .subscribe(
        (data: string) => {
          this.submittedOrder = data;
          console.log(this.submittedOrder);
          this.orderSourse.next(this.orderInDB);
        },
        (error) => {
          console.log(`Error from post request${error.statusText} `);
        }
      );
    console.log(order);
  }

  getOrdersFromApi() {
    this.http.get(this.orderAPI + '?companyId=8585').subscribe((data: any) => {
      let ordersFromApi: Order[] = data.map((o) => {
        const order = new Order();
        order.id = o.id;
        order.companyId = o.companyId;
        order.created = o.created;
        order.createdBy = o.createdBy;
        order.paymentMethod = o.paymentMethod;
        order.totalPrice = o.totalPrice;
        let orderObjects: OrderRow[] = o.orderRows.map((row) => {
          const orderRow = new OrderRow();
          orderRow.productId = row.productId;
          orderRow.amount = row.amount;
          return orderRow;
        });
        order.orderRows = orderObjects;
        return order;
      });
      this.orderListSourse.next(ordersFromApi);
      this.orderList = ordersFromApi;
      console.log(this.orderList);
    });
  }

  getOrders() {
    return this.orderList;
  }

  removeOrder(order: Order) {
    this.http
      .delete(this.orderAPI + '/' + order.id)
      .subscribe((deletedOrder: Order) => {
        console.log(`Delete this order${deletedOrder.id}`);
        this.orderSourse.next(deletedOrder);
      });
  }
}
