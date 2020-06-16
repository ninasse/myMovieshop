import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { ProductsComponent } from './products.component';
import { MovieService } from 'src/app/services/movieService/movie.service';
import MockMovieService from 'src/app/services/movieService/MockMovieService';
import { CartService } from 'src/app/services/cartService/cart.service';
import MockCartService from 'src/app/services/cartService/MockCartService';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsComponent],
      providers: [
        ProductsComponent,
        { provide: MovieService, useClass: MockMovieService },
        { provide: CartService, useClass: MockCartService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should return a list of movies', () => {
    expect(component.movies.length).toBeGreaterThan(0);
  });
});
