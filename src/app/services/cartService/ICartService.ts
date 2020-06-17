import { Subject } from 'rxjs';
import Movie from 'src/app/models/Movie';
import CartItem from 'src/app/models/CartItem';

export default interface ICartService {
  cartSource: Subject<CartItem[]>;
  itemsInCart: Subject<Number>;
  selectedMovieSource: Subject<Movie>;
  selectedItemInCartSource: Subject<CartItem>;
  movieIncart: CartItem;

  getCartItems(): void;

  clearCart(): void;
}
