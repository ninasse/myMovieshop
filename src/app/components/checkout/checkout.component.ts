import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/orderService/order.service';
import Order from 'src/app/models/Order';
import Customer from 'src/app/models/Customer';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  totalAmmount: number;
  submittedOrder: Order;
  customer: Customer;
  constructor(private orderService: OrderService) {}
  grandTotal(sum) {
    this.totalAmmount = sum;
  }
  saveOrder(order) {
    this.orderService.orderSourse.subscribe((order: Order) => {
      this.submittedOrder = order;
    });
    this.orderService.postOrder(order);
  }
  saveCustomerDetails(c: Customer) {
    this.customer = c;
  }
  ngOnInit(): void {
    this.grandTotal(this.totalAmmount);
  }
}
