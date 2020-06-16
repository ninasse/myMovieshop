import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInformationComponent } from './product-information.component';
import { MovieService } from 'src/app/services/movieService/movie.service';
import MockMovieService from 'src/app/services/movieService/MockMovieService';
import { CartService } from 'src/app/services/cartService/cart.service';
import MockCartService from 'src/app/services/cartService/MockCartService';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProductInformationComponent', () => {
  let component: ProductInformationComponent;
  let fixture: ComponentFixture<ProductInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductInformationComponent],
      imports: [RouterTestingModule],
      providers: [
        ProductInformationComponent,
        { provide: MovieService, useClass: MockMovieService },
        { provide: CartService, useClass: MockCartService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
