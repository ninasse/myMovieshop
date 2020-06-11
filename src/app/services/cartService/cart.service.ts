import { Injectable } from '@angular/core';
import Movie from 'src/app/models/Movie';
import { Subject } from 'rxjs';
import CartItem from 'src/app/models/CartItem';
import ICartService from './ICartService';

@Injectable({
  providedIn: 'root',
})
export class CartService implements ICartService {
  cartItems = JSON.parse(localStorage.getItem('Cartitems')) || [];
  cartSource: Subject<CartItem[]> = new Subject<CartItem[]>();
  selectedMovieSource: Subject<Movie> = new Subject<Movie>();
  selectedItemInCartSource: Subject<CartItem> = new Subject<CartItem>();
  movieIncart: CartItem;
  constructor() {}

  selectedItemToAdjust(selectedItem: CartItem) {
    this.selectedItemInCartSource.next(selectedItem);
  }

  increaseCartItem(item: CartItem) {
    this.movieIncart = this.cartItems.find((m) => m.Id === item.Id);
    console.log(this.movieIncart);
    this.movieIncart.quantity += 1;
    this.movieIncart.total = this.movieIncart.Price * this.movieIncart.quantity;
    localStorage.setItem('Cartitems', JSON.stringify(this.cartItems));
    return this.movieIncart;
  }

  addItemToCart(selectedMovie: Movie) {
    this.movieIncart = this.cartItems.find((m) => m.Id === selectedMovie.Id);
    if (!this.movieIncart) {
      this.cartItems.push({
        ...selectedMovie,
        quantity: 1,
        total: selectedMovie.Price,
      });
      localStorage.setItem('Cartitems', JSON.stringify(this.cartItems));
      return;
    }
    this.increaseCartItem(this.movieIncart);
  }

  getCartItems() {
    return this.cartItems;
  }

  removeItemFromCart() {
    if (this.movieIncart.quantity <= 1) {
      this.cartItems = this.cartItems.filter(
        (item: CartItem) => this.movieIncart.Id !== item.Id
      );
      localStorage.setItem('Cartitems', JSON.stringify(this.cartItems));
      console.log(this.cartItems);
      return this.cartItems;
    }
    this.getCartItems();
  }

  decreaseCartItem(item: CartItem) {
    this.movieIncart = item;
    if (this.movieIncart.quantity > 1) {
      this.movieIncart.quantity--;
      this.movieIncart.total =
        this.movieIncart.Price * this.movieIncart.quantity;
      localStorage.setItem('Cartitems', JSON.stringify(this.cartItems));
      return this.movieIncart;
    } else {
      this.removeItemFromCart();
    }
  }

  clearCart() {
    this.cartItems = [];
    return this.cartItems;
  }
}
