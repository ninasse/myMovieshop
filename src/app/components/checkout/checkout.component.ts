import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/orderService/order.service';
import Order from 'src/app/models/Order';
import Customer from 'src/app/models/Customer';
import CartItem from 'src/app/models/CartItem';
import { CartService } from 'src/app/services/cartService/cart.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  cart: CartItem[] = JSON.parse(localStorage.getItem('Cartitems')) || [];
  totalAmmount: number;
  submittedOrder: Order;
  customer: Customer;
  cartSubmitted = true;
  customerSubmitted = true;
  orderSubmitted = false;
  constructor(private orderService: OrderService) {}
  grandTotal(sum) {
    this.totalAmmount = sum;
  }
  saveOrder(order) {
    this.orderService.orderSourse.subscribe((order: Order) => {
      this.submittedOrder = order;
    });
    this.orderSubmitted = true;
    this.orderService.postOrder(order);
    this.cart = [];
    localStorage.setItem('Cartitems', JSON.stringify(this.cart));
  }
  saveCustomerDetails(c: Customer) {
    this.customer = c;
    this.customerSubmitted = !this.customerSubmitted;
  }
  submitCart(cartSubmitted) {
    this.cartSubmitted = !this.cartSubmitted;
  }
  ngOnInit(): void {
    this.grandTotal(this.totalAmmount);
    this.submitCart(this.cartSubmitted);
  }
}
