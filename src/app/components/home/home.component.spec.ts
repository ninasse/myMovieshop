import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { MovieService } from 'src/app/services/movieService/movie.service';
import MockMovieService from 'src/app/services/movieService/MockMovieService';
import Category from 'src/app/models/Category';
import { CartService } from 'src/app/services/cartService/cart.service';
import MockCartService from 'src/app/services/cartService/MockCartService';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let selectedCategory: Category;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        HomeComponent,
        { provide: MovieService, useClass: MockMovieService },
        { provide: CartService, useClass: MockCartService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return a list of categories and a list of movies', () => {
    expect(component.categories.length).toBeGreaterThan(1);
    expect(component.movies.length).toBeGreaterThan(1);
  });
});
