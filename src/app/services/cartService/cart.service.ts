import { Injectable } from '@angular/core';
import Movie from 'src/app/models/Movie';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems = JSON.parse(localStorage.getItem('Cartitems')) || [];
  selectedMovieSource = new Subject<Movie>();
  movieIncart;
  constructor() {}

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
    const cartItem = this.movieIncart;
    console.log(cartItem);
    return this.movieIncart;
  }

  getCartItems() {
    return this.cartItems;
  }
  decreaseCartItem(selectedMovie: Movie) {
    //   this.movieIncart = this.cartItems.find((m) => m.Id === selectedMovie.Id);
    //   this.movieIncart.quantity--;
    //   this.movieIncart.total = this.movieIncart.Price * this.movieIncart.quantity;
    localStorage.setItem('Cartitems', JSON.stringify(this.cartItems));
    return this.movieIncart;
  }

  clearCart() {
    this.cartItems = [];
    return this.cartItems;
  }
}
