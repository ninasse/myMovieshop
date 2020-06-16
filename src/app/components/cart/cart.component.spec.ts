import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CartComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    const selectedMovieInCart = {
      Id: 76,
      Title: 'Dark Knight',
      Descr:
        'When the menace known as the Joker emerges from his mysterious past...',
      ImgUrl: 'URL to img',
      ReleaseYear: 2008,
      Price: 100,
      quantity: 2,
      total: 200,
    };
    component.movieIncart = selectedMovieInCart;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send sum to the parent', () => {
    const spy = spyOn(component.sum, 'emit');
    component.submitCart();
    expect(spy).toHaveBeenCalled();
  });

  /* it('should increase quantity with 1', () => {
    component.increaseItemInCart(component.movieIncart);
    expect(component.movieIncart.quantity).toBe(3);
  }); */
});
