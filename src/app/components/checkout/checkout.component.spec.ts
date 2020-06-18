import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutComponent } from './checkout.component';
import { OrderService } from 'src/app/services/orderService/order.service';
import MockOrderService from 'src/app/services/orderService/MockOrderService';
import { CartService } from 'src/app/services/cartService/cart.service';
import MockCartService from 'src/app/services/cartService/MockCartService';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CheckoutComponent],
      providers: [
        CheckoutComponent,
        { provide: OrderService, useClass: MockOrderService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save the order', () => {
    spyOn(component, 'submitCart');
    component.ngOnInit();
    expect(component.submitCart).toHaveBeenCalled();
    expect(component.cartSubmitted).toBeFalse();
  });
});
