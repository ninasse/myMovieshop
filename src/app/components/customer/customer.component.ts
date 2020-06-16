import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Customer from 'src/app/models/Customer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  @Output() customerSubmittedInformation = new EventEmitter<Customer>();
  customer: Customer;

  customerDetails = this.fb.group({
    fName: ['', [Validators.required, Validators.minLength(2)]],
    lName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    address: this.fb.group({
      street: ['', Validators.required],
      zip: ['', Validators.required],
      city: [''],
    }),
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  get fName() {
    return this.customerDetails.get('fName');
  }
  get lName() {
    return this.customerDetails.get('lName');
  }
  get email() {
    return this.customerDetails.get('email');
  }
  get phone() {
    return this.customerDetails.get('phone');
  }
  get street() {
    return this.customerDetails.get('address').get('street');
  }
  get zip() {
    return this.customerDetails.get('address').get('zip');
  }
  get city() {
    return this.customerDetails.get('address').get('city');
  }
  createNewCustomer() {
    let customer: Customer = new Customer();
    customer.firstname = this.customerDetails.value.fName;
    customer.lastname = this.customerDetails.value.lName;
    customer.email = this.customerDetails.value.email;
    customer.phone = this.customerDetails.value.phone;
    customer.street = this.customerDetails.value.address.street;
    customer.zip = this.customerDetails.value.address.zip;
    customer.city = this.customerDetails.value.address.city;
    this.customer = customer;
    return this.customer;
  }

  saveCustomerDeatils() {
    this.createNewCustomer();
    this.customerSubmittedInformation.emit(this.customer);
  }
}
