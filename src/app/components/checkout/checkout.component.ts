import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { OrderService } from 'src/app/services/orderService/order.service';
import Order from 'src/app/models/Order';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  totalAmmount: number;
  constructor(private orderService: OrderService) {}
  grandTotal(sum) {
    this.totalAmmount = sum;
  }
  ngOnInit(): void {
    this.grandTotal(this.totalAmmount);
  }
}
