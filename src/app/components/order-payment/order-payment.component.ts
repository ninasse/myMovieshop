import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Order, { OrderRow } from 'src/app/models/Order';
import Customer from 'src/app/models/Customer';

@Component({
  selector: 'app-order-payment',
  templateUrl: './order-payment.component.html',
  styleUrls: ['./order-payment.component.scss'],
})
export class OrderPaymentComponent implements OnInit {
  @Input() totalAmmount: number;
  @Input() customer: Customer;
  @Output() submittedOrder = new EventEmitter<Order>();
  cart = JSON.parse(localStorage.getItem('Cartitems')) || [];
  order;
  orderIsSubmitted = false;
  orderRows: OrderRow[];

  filteredOrderRows: OrderRow[] = this.cart.map((c) => {
    const orderRow = new OrderRow();
    orderRow.productId = c.Id;
    orderRow.amount = c.quantity;
    return orderRow;
  });

  paymentDetails = this.fb.group({
    paymentMethod: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {}
  get paymentMethod() {
    return this.paymentDetails.get('paymentMethod');
  }

  createOrder() {
    let newOrder = {
      companyId: 8585,
      created: new Date().toLocaleString(),
      createdBy: this.customer.firstname + this.customer.lastname,
      paymentMethod: this.paymentDetails.value.paymentMethod,
      totalPrice: this.totalAmmount,
      status: 0,
      orderRows: this.filteredOrderRows,
    };
    this.order = newOrder;
    console.log(this.order);
    return newOrder;
  }
  submitOrder() {
    this.createOrder();
    this.submittedOrder.emit(this.order);
    this.orderIsSubmitted = true;
  }
  ngOnInit(): void {}
}
