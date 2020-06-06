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

    this.cartService.selectedItemInCartSource.subscribe((item: CartItem) => {
      this.movieIncart = item;
      this.cartService.selectedItemToAdjust(item);
    });
    console.log(this.movieIncart);
  }
  decreaseFromCart(item: CartItem) {
    this.cartService.selectedItemInCartSource.subscribe((item: CartItem) => {
      this.movieIncart = item;
    });
    this.cartService.decreaseCartItem(item);
    console.log(`${item.Id} TO BE REMOVED`);
  }
}
