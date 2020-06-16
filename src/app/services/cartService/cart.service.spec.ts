import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';
import CartItem from 'src/app/models/CartItem';

describe('CartService', () => {
  let service: CartService;
  let item: CartItem;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
