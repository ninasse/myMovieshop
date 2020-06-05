import { Injectable } from '@angular/core';
import Movie from 'src/app/models/Movie';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems = JSON.parse(localStorage.getItem('Cartitems')) || [];
  selectedMovieSource = new Subject<Movie>();
  constructor() {}

  addItemToCart(selectedMovie: Movie) {
    let movieIncart = this.cartItems.find((m) => m.Id === selectedMovie.Id);
    if (!movieIncart) {
      this.cartItems.push({ ...selectedMovie, quantity: 1 });
      localStorage.setItem('Cartitems', JSON.stringify(this.cartItems));
      return;
    }
    movieIncart.quantity += 1;
    console.log(`${selectedMovie.Id} has been addded to cart!`);
    localStorage.setItem('Cartitems', JSON.stringify(this.cartItems));
  }

  showCart() {
    return this.cartItems;
  }

  clearCart() {
    this.cartItems = [];
    return this.cartItems;
  }
}
