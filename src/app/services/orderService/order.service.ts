import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Order, { OrderRow } from 'src/app/models/Order';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  orderListSourse: Subject<Order[]> = new Subject<Order[]>();
  orderSourse: Subject<Order> = new Subject<Order>();
  orderInDB: Order;
  submittedOrder = JSON.stringify(Order);

  constructor(private http: HttpClient) {}

  postOrder(order) {
    order = JSON.stringify(order);
    console.log('hej från Order Service!' + order);
    this.http
      .post(
        'https://medieinstitutet-wie-products.azurewebsites.net/api/orders',
        order,
        { headers: { 'content-type': 'application/json' } }
      )
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
  }

  getOrdersFromApi() {
    this.http
      .get(
        'https://medieinstitutet-wie-products.azurewebsites.net/api/orders?companyId=8585'
      )
      .subscribe((data: any) => {
        let ordersFromApi: Order[] = data.map((o) => {
          const order = new Order();
          order.id = o.id;
          order.companyId = o.companyId;
          order.created = o.created;
          order.createdBy = o.createdBy;
          order.paymentMethod = o.paymentMethod;
          order.totalPrice = o.totalPrice;
          let orderObjects: OrderRow[] = o.orderRows.map((or) => {
            const orderRow = new OrderRow();
            orderRow.productId = or.productId;
            orderRow.amount = or.amount;
            return orderRow;
          });
          order.orderRows = orderObjects;

          return order;
        });
        this.orderListSourse.next(ordersFromApi);
        console.log(ordersFromApi);
      });
  }
}
