import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { OrderService } from './order.service';
import Order, { OrderRow } from 'src/app/models/Order';
import MockOrderService from './MockOrderService';

describe('OrderService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let service: OrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrderService,
        { provide: OrderService, useClass: MockOrderService },
      ],
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = TestBed.inject(OrderService);
    service = new OrderService(<any>httpClientSpy);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return a list of orders when httpClient is called', () => {
    const expectedOrders: Order[] = [
      {
        id: 78,
        companyId: 8585,
        created: '2020-06-15 00:05:20',
        createdBy: 'Customername',
        paymentMethod: 'Credit card',
        totalPrice: 200,
        status: 1,
        orderRows: [{ productId: 78, amount: 2 }],
      },
      {
        id: 78,
        companyId: 8585,
        created: '2020-06-15 00:05:20',
        createdBy: 'Customername',
        paymentMethod: 'Credit card',
        totalPrice: 200,
        status: 1,
        orderRows: [{ productId: 78, amount: 2 }],
      },
    ];
    httpClientSpy.get.and.returnValue(expectedOrders);
    service.orderListSourse.subscribe(
      (orders) => expect(orders).toEqual(expectedOrders),
      fail
    );
    expect(expectedOrders.length).toBeGreaterThan(0);
  });
});
