import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Order from 'src/app/models/Order';
import CartItem from 'src/app/models/CartItem';
import { CartService } from 'src/app/services/cartService/cart.service';

@Component({
  selector: 'app-order-payment',
  templateUrl: './order-payment.component.html',
  styleUrls: ['./order-payment.component.scss'],
})
export class OrderPaymentComponent implements OnInit {
  @Input() totalAmmount: number;
  cart = [];
  order: Order;
  orderIsSubmitted = false;

  paymentDetails = this.fb.group({
    paymentMethod: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private cartService: CartService) {}
  get paymentMethod() {
    return this.paymentDetails.get('paymentMethod');
  }
  createOrder(sum) {
    let newOrder: Order = new Order();
    let randomNumber = Math.floor(Math.random() * 1000 + 1);
    newOrder.id = randomNumber;
    newOrder.companyId = 8585;
    newOrder.created = new Date().toLocaleString();
    newOrder.createdBy = 'GOD!';
    newOrder.paymentMethod = this.paymentDetails.value.paymentMethod;
    newOrder.totalPrice = this.totalAmmount;
    newOrder.status = 1;
    newOrder.orderRows = this.cart;
    this.order = newOrder;
    return this.order;
  }
  saveOrder() {
    this.createOrder(this.order);
    this.orderIsSubmitted = true;
    console.log(this.order);
    console.log(this.paymentDetails.value);
  }
  ngOnInit(): void {
    this.cartService.cartSource.subscribe((items: CartItem[]) => {
      this.cart = items;
    });
    this.cart = this.cartService.getCartItems();
    console.log(this.cart);
  }
}
