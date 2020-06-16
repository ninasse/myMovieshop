import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintProductComponent } from './print-product.component';
import Movie from 'src/app/models/Movie';
import { Component } from '@angular/core';
import { MovieService } from 'src/app/services/movieService/movie.service';
import MockMovieService from 'src/app/services/movieService/MockMovieService';

describe('PrintProductComponent', () => {
  let component: PrintProductComponent;
  let fixture: ComponentFixture<PrintProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PrintProductComponent],
      providers: [
        PrintProductComponent,
        { provide: MovieService, useClass: MockMovieService },
      ],
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(PrintProductComponent);
    component = fixture.componentInstance;
    const selectedItem = {
      Id: 76,
      Title: 'Dark Knight',
      Descr:
        'When the menace known as the Joker emerges from his mysterious past...',
      ImgUrl: 'URL to img',
      ReleaseYear: 2008,
      Category: [
        { categoryId: 5, category: 'action' },
        { categoryId: 6, category: 'thriller' },
      ],
      Price: 199,
    };
    component.movie = selectedItem;
    fixture.detectChanges();
  });
  it('should send the movie to the parent', () => {
    const spy = spyOn(component.addedToCart, 'emit');
    component.addToCart(component.movie);
    expect(spy).toHaveBeenCalled();
  });
});

describe('PrintProductComponent with ProductsComponent as parent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HostComponent, PrintProductComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  @Component({
    selector: 'app-host',
    template: ' <app-print-product [movie]="movie"></app-print-product>',
  })
  class HostComponent {
    movie: Movie = {
      Id: 76,
      Title: 'Dark Knight',
      Descr:
        'When the menace known as the Joker emerges from his mysterious past...',
      ImgUrl: 'URL to img',
      ReleaseYear: 2008,
      Category: [
        { categoryId: 5, category: 'action' },
        { categoryId: 6, category: 'thriller' },
      ],
      Price: 199,
    };
  }
});
