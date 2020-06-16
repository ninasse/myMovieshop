import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPaymentComponent } from './order-payment.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('OrderPaymentComponent', () => {
  let component: OrderPaymentComponent;
  let fixture: ComponentFixture<OrderPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrderPaymentComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPaymentComponent);
    component = fixture.componentInstance;
    const orderToSend = {
      companyId: 8585,
      created: '2020-01-26T22:30:45',
      createdBy: 'Nina Customer',
      paymentMethod: 'Swish',
      totalPrice: 800,
      status: 0,
      orderRows: [
        { productId: 87, amount: 2 },
        { productId: 89, amount: 3 },
      ],
    };
    component.order = orderToSend;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should return paymentDeatils form as valid', () => {
    component.paymentDetails.controls['paymentMethod'].setValue('Kisses');
    expect(component.paymentDetails.valid).toBeTrue();
  });
});
