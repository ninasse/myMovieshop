import { Component, OnInit } from '@angular/core';
import Order, { OrderRow } from 'src/app/models/Order';
import { OrderService } from 'src/app/services/orderService/order.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  orders: Order[] = [];
  order: Order;
  constructor(private orderService: OrderService) {}

  deleteOrder(order: Order) {
    this.orderService.orderSourse.subscribe((order: Order) => {
      this.order = order;
      this.orderService.getOrdersFromApi();
    });
    console.log(this.order);
    this.orderService.removeOrder(order);
  }

  ngOnInit(): void {
    this.orderService.orderListSourse.subscribe((orders: Order[]) => {
      this.orders = orders;
    });
    console.log(this.orders);
    this.orderService.getOrdersFromApi();
  }
}
