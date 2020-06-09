import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Order from 'src/app/models/Order';
import { HttpClient } from '@angular/common/http';
import Movie from 'src/app/models/Movie';
import CartItem from 'src/app/models/CartItem';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  ordersSourse: Subject<Order[]> = new Subject<Order[]>();
  selectedOrderSourse: Subject<Order> = new Subject<Order>();

  constructor(private http: HttpClient) {}

  getOrdersFromApi() {
    this.http
      .get('https://medieinstitutet-wie-products.azurewebsites.net/api/orders')
      .subscribe((orders: any) => {
        let ordersFromApi: Order[] = orders.map((o) => {
          const order = new Order();
          order.id = o.id;
          order.companyId = o.companyId;
          order.created = o.created;
          order.createdBy = o.createdBy;
          order.paymentMethod = o.paymentMethod;
          order.totalPrice = o.totalPrice;
          order.orderRows = o.orderRows;

          return order;
        });
        this.ordersSourse.next(ordersFromApi);
      });
  }
}
