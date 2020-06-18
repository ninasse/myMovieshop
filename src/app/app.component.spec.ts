import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ProductsComponent } from './components/products/products.component';
import { MovieService } from './services/movieService/movie.service';
import MockMovieService from './services/movieService/MockMovieService';
import { PrintProductComponent } from './components/print-product/print-product.component';
import { ProductInformationComponent } from './components/product-information/product-information.component';
import { HomeComponent } from './components/home/home.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CartService } from './services/cartService/cart.service';
import MockCartService from './services/cartService/MockCartService';
import { OrderService } from './services/orderService/order.service';
import MockOrderService from './services/orderService/MockOrderService';
import { CartComponent } from './components/cart/cart.component';
import { CustomerComponent } from './components/customer/customer.component';
import { OrderPaymentComponent } from './components/order-payment/order-payment.component';
import { AdminComponent } from './components/admin/admin.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './components/search/search.component';
import { SearchService } from './services/searchService/search.service';
import { MockSearchService } from './services/searchService/MockSearchService';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        HomeComponent,
        { provide: MovieService, useClass: MockMovieService },
        { provide: OrderService, useClass: MockOrderService },
        ProductsComponent,
        { provide: MovieService, useClass: MockMovieService },
        { provide: CartService, useClass: MockCartService },
        ProductInformationComponent,
        { provide: MovieService, useClass: MockMovieService },
        { provide: CartService, useClass: MockCartService },
        PrintProductComponent,
        CheckoutComponent,
        { provide: OrderService, useClass: MockOrderService },
        CartComponent,
        CustomerComponent,
        OrderPaymentComponent,
        AdminComponent,
        { provide: OrderService, useClass: MockOrderService },
        SearchComponent,
        { provide: SearchService, useClass: MockSearchService },
      ],
      declarations: [AppComponent],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
