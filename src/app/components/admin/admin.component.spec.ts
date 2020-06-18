import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComponent } from './admin.component';
import { OrderService } from 'src/app/services/orderService/order.service';
import MockOrderService from 'src/app/services/orderService/MockOrderService';
import Order from 'src/app/models/Order';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminComponent],
      providers: [
        AdminComponent,
        { provide: OrderService, useClass: MockOrderService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a list of orders', () => {
    component.ngOnInit();
    expect(component.orders.length).toEqual(3);
  });

  it('should delete order when delete-order-button is clicked', () => {
    spyOn(component, 'deleteOrder');
    const deleteButton = fixture.debugElement.nativeElement.querySelector(
      '#delete-order-button'
    );

    deleteButton.click();
    expect(component.deleteOrder).toHaveBeenCalled();
  });

  it('should delete  order from list of orders', () => {
    const numberOfOrders = component.orders.length;
    const order: Order = {
      id: 5566,
      companyId: 8585,
      created: '2020-06-12T00:30:43',
      createdBy: 'Some One',
      paymentMethod: 'Swish',
      totalPrice: 500,
      status: 0,
      orderRows: [{ productId: 87, amount: 5 }],
    };

    component.deleteOrder(order);
    expect(component.orders.length).toBe(numberOfOrders - 1);
  });
});
