import CartItem from 'src/app/models/CartItem';
import { Subject } from 'rxjs';
import Movie from 'src/app/models/Movie';
import ICartService from './ICartService';

export default class MockCartService implements ICartService {
  private cartItems: CartItem[] = [
    {
      Id: 76,
      Title: 'Dark Knight',
      Descr:
        'When the menace known as the Joker emerges from his mysterious past...',
      ImgUrl: 'URL to img',
      ReleaseYear: 2008,
      Price: 100,
      quantity: 2,
      total: 200,
    },
    {
      Id: 89,
      Title: 'The Departed',
      Descr: 'An undercover cop and a mole in the police attempt...',
      ImgUrl: 'some url',
      ReleaseYear: 2006,
      Price: 150,
      quantity: 1,
      total: 150,
    },
    {
      Id: 83,
      Title: 'City Light',
      Descr: 'With the aid of a wealthy erratic tippler...',
      ImgUrl: 'some url',
      ReleaseYear: 1931,
      Price: 100,
      quantity: 3,
      total: 300,
    },
  ];
  movieIncart: CartItem = {
    Id: 83,
    Title: 'City Light',
    Descr: 'With the aid of a wealthy erratic tippler...',
    ImgUrl: 'some url',
    ReleaseYear: 1931,
    Price: 100,
    quantity: 3,
    total: 300,
  };
  movieToAdd: Movie = {
    Id: 83,
    Title: 'City Light',
    Descr: 'With the aid of a wealthy erratic tippler...',
    ImgUrl: 'some url',
    ReleaseYear: 1931,
    Category: [{ categoryId: 7, category: 'comedy' }],
    Price: 100,
  };
  itemsInCart: Subject<Number> = new Subject<Number>();
  cartSource: Subject<CartItem[]> = new Subject<CartItem[]>();
  selectedMovieSource: Subject<Movie> = new Subject<Movie>();
  selectedItemInCartSource: Subject<CartItem> = new Subject<CartItem>();
  numberOfItemsInCart = 3;

  getCartItems() {
    this.cartItems = this.cartItems;
  }
  showNumberOfItemsInCart() {
    if (this.cartItems.length >= 1) {
      this.numberOfItemsInCart = this.cartItems.reduce(function (a, b) {
        return a + b.quantity;
      }, 0);
    }
    this.itemsInCart.next(this.numberOfItemsInCart);
  }
  addItemToCart(selectedMovie: Movie) {
    this.movieIncart = this.cartItems.find((m) => m.Id === selectedMovie.Id);
    if (!this.movieIncart) {
      this.cartItems.push({
        ...selectedMovie,
        quantity: 1,
        total: selectedMovie.Price,
      });
    }
    this.increaseCartItem(this.movieIncart);
  }
  increaseCartItem(item: CartItem) {
    this.movieIncart = this.cartItems.find((m) => m.Id === item.Id);
    this.movieIncart.quantity += 1;
    this.movieIncart.total = this.movieIncart.Price * this.movieIncart.quantity;
    return this.movieIncart;
  }
  clearCart() {
    this.cartItems = [];
    return this.cartItems;
  }
}
