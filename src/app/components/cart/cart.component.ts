import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cartService/cart.service';
import { MovieService } from 'src/app/services/movieService/movie.service';
import CartItem from 'src/app/models/CartItem';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart: CartItem[] = [];
  movieIncart: CartItem;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartSource.subscribe((items: CartItem[]) => {
      this.cart = items;
    });
    this.cart = this.cartService.getCartItems();
    console.log(this.cart);
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
  }

  increaseItemInCart(item: CartItem) {
    this.cartService.selectedItemInCartSource.subscribe((item: CartItem) => {
      this.cartService.selectedItemToAdjust(item);
    });
    this.cartService.increaseCartItem(item);
    console.log(`${item.Id} TO BE INCREASED`);
  }
}
