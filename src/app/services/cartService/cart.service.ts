import { Injectable } from '@angular/core';
import Movie from 'src/app/models/Movie';
import { Subject } from 'rxjs';
import CartItem from 'src/app/models/CartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems = JSON.parse(localStorage.getItem('Cartitems')) || [];
  cartSource = new Subject<CartItem[]>();
  selectedMovieSource = new Subject<Movie>();
  selectedItemInCartSource = new Subject<CartItem>();
  movieIncart: CartItem;
  constructor() {}

  selectedItemToAdjust(selectedItem: CartItem) {
    this.selectedItemInCartSource.next(selectedItem);
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
    this.movieIncart.quantity += 1;
    this.movieIncart.total = this.movieIncart.Price * this.movieIncart.quantity;
    localStorage.setItem('Cartitems', JSON.stringify(this.cartItems));
    console.log(this.movieIncart);
    return this.movieIncart;
  }

  getCartItems() {
    return this.cartItems;
  }
  decreaseCartItem(item: CartItem) {
    this.movieIncart = item;
    this.movieIncart.quantity--;
    this.movieIncart.total = this.movieIncart.Price * this.movieIncart.quantity;
    localStorage.setItem('Cartitems', JSON.stringify(this.cartItems));
    console.log(this.movieIncart.Id + 'TO BE REMOVED');
    return this.movieIncart;
  }

  clearCart() {
    this.cartItems = [];
    return this.cartItems;
  }
}
