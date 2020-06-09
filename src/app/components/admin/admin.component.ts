import { Component, OnInit } from '@angular/core';
import Order from 'src/app/models/Order';
import { OrderService } from 'src/app/services/orderService/order.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  orders: Order[] = [];
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.ordersSourse.subscribe((orders: Order[]) => {
      this.orders = orders;
      console.log(this.orders);
    });
    this.orderService.getOrdersFromApi();
  }
}
