import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';
import CartItem from 'src/app/models/CartItem';
import MockCartService from './MockCartService';
import Movie from 'src/app/models/Movie';

describe('CartService', () => {
  let service: CartService;
  let item: CartItem;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CartService,
        { provide: CartService, useClass: MockCartService },
      ],
    });
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an array of cartItems', () => {
    service.getCartItems();
    expect(service.cartItems.length).toBeGreaterThan(0);
  });
  it('should increase quantity', () => {
    service.increaseCartItem(service.movieIncart);
    expect(service.movieIncart.quantity).toEqual(4);
  });
  it('should add an item to cart', () => {
    let movieToAdd: Movie = {
      Id: 83,
      Title: 'City Light',
      Descr: 'With the aid of a wealthy erratic tippler...',
      ImgUrl: 'some url',
      ReleaseYear: 1931,
      Category: [{ categoryId: 7, category: 'comedy' }],
      Price: 100,
    };
    service.addItemToCart(movieToAdd);
    expect(service.cartItems.length).toBeGreaterThan(2);
  });
});
