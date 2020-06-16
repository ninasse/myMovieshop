import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerComponent } from './customer.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('CustomerComponent', () => {
  let component: CustomerComponent;
  let fixture: ComponentFixture<CustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerComponent);
    component = fixture.componentInstance;
    const customerToShow = {
      firstname: 'Nina',
      lastname: 'Something',
      email: 'mail@mail.com',
      phone: '12345',
      street: 'Somewhere',
      zip: '1122',
      city: 'Stockholm',
    };
    component.customer = customerToShow;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should send the customer to the parent', () => {
    const spy = spyOn(component.customerSubmitted, 'emit');
    component.saveCustomerDeatils();
    expect(spy).toHaveBeenCalled();
  });

  it('should set subMittedCustomerInformation to true', () => {
    component.saveCustomerDeatils();
    expect(component.submittedCustomerInformation).toBeTrue();
  });

  it('should send customerSubmitted to parent', () => {
    const spy = spyOn(component.customerSubmitted, 'emit');
    component.saveCustomerDeatils();
    expect(spy).toHaveBeenCalled();
  });

  it('should return form as invalid', () => {
    component.customerDetails.controls['fName'].setValue('A');
    component.customerDetails.controls['lName'].setValue('');
    component.customerDetails.controls['email'].setValue('email');
    component.customerDetails.controls['phone'].setValue('');

    expect(component.customerDetails.valid).toBeFalse();
  });
});
