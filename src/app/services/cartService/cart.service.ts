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
  itemsInCart: Subject<number> = new Subject<number>();
  selectedMovieSource: Subject<Movie> = new Subject<Movie>();
  selectedItemInCartSource: Subject<CartItem> = new Subject<CartItem>();
  movieIncart: CartItem;
  numberOfItemsInCart: number;

  constructor() {}

  selectedItemToAdjust(selectedItem: CartItem) {
    this.selectedItemInCartSource.next(selectedItem);
  }

  showNumberOfItemsInCart(items: number) {
    if (this.cartItems.length >= 1) {
      this.numberOfItemsInCart = this.cartItems.reduce(function (a, b) {
        return a + b.quantity;
      }, 0);
    }
    this.itemsInCart.next(this.numberOfItemsInCart);
  }

  increaseCartItem(item: CartItem) {
    this.movieIncart = this.cartItems.find((m) => m.Id === item.Id);
    this.movieIncart.quantity += 1;
    this.movieIncart.total = this.movieIncart.Price * this.movieIncart.quantity;
    localStorage.setItem('Cartitems', JSON.stringify(this.cartItems));
    this.showNumberOfItemsInCart(this.numberOfItemsInCart);
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
      this.showNumberOfItemsInCart(this.numberOfItemsInCart);
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
      this.showNumberOfItemsInCart(this.numberOfItemsInCart);
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
      this.showNumberOfItemsInCart(this.numberOfItemsInCart);
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
