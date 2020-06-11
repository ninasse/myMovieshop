import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CartService } from 'src/app/services/cartService/cart.service';
import CartItem from 'src/app/models/CartItem';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  @Output() sum = new EventEmitter<number>();
  cart: CartItem[] = JSON.parse(localStorage.getItem('Cartitems')) || [];
  movieIncart: CartItem;
  totalSum: number;

  constructor(private cartService: CartService) {}

  getTotalSum() {
    this.totalSum = this.cart.reduce((sum, item) => +sum + +item.total, 0);
    return this.totalSum;
  }
  decreaseFromCart(item: CartItem) {
    this.cartService.selectedItemInCartSource.subscribe((item: CartItem) => {
      this.cartService.selectedItemToAdjust(item);
    });
    this.cartService.decreaseCartItem(item);
    //console.log(`${item.Id} TO BE REMOVED`);
    this.cartService.cartSource.subscribe((items: CartItem[]) => {
      this.cart = items;
    });
    this.cart = this.cartService.getCartItems();
    this.getTotalSum();
  }
  increaseItemInCart(item: CartItem) {
    this.cartService.selectedItemInCartSource.subscribe((item: CartItem) => {
      this.cartService.selectedItemToAdjust(item);
    });
    this.cartService.increaseCartItem(item);
    this.getTotalSum();
    console.log(`${item.Id} TO BE INCREASED`);
  }
  submitCart() {
    this.sum.emit(this.totalSum);
    console.log(this.cart);
  }
  ngOnInit(): void {
    this.cartService.cartSource.subscribe((items: CartItem[]) => {
      this.cart = items;
    });
    this.cart = this.cartService.getCartItems();
    this.getTotalSum();
    this.sum.emit(this.totalSum);
  }
}
