import CartItem from 'src/app/models/CartItem';
import { Subject } from 'rxjs';
import Movie from 'src/app/models/Movie';
import ICartService from './ICartService';

export default class MockCartService implements ICartService {
  private cartItems: CartItem[] = [
    {
      Id: 78,
      Title: 'Frozen',
      Descr: 'Lorem Ipsum',
      ImgUrl: 'some url',
      ReleaseYear: 2015,
      // Category: [{ CatId: number }];
      Price: 100,
      quantity: 2,
      total: 200,
    },
    {
      Id: 79,
      Title: 'Titanic',
      Descr: 'Buhu...',
      ImgUrl: 'some url',
      ReleaseYear: 1998,
      // Category: [{ CatId: number }];
      Price: 150,
      quantity: 1,
      total: 150,
    },
    {
      Id: 80,
      Title: 'Ice Age',
      Descr: 'Ha ha!!',
      ImgUrl: 'some url',
      ReleaseYear: 2000,
      // Category: [{ CatId: number }];
      Price: 100,
      quantity: 3,
      total: 300,
    },
  ];
  cartSource: Subject<CartItem[]> = new Subject<CartItem[]>();
  selectedMovieSource: Subject<Movie> = new Subject<Movie>();
  selectedItemInCartSource: Subject<CartItem> = new Subject<CartItem>();
  movieIncart: CartItem;

  getCartItems() {
    return this.cartItems;
  }

  clearCart() {
    this.cartItems = [];
    return this.cartItems;
  }
}
