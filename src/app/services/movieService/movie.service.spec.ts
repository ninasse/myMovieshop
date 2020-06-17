import { TestBed } from '@angular/core/testing';
import { MovieService } from './movie.service';
import { HttpClient } from '@angular/common/http';
import Movie from 'src/app/models/Movie';
import Category from 'src/app/models/Category';
import MockMovieService from './MockMovieService';

describe('MovieService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let service: MovieService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      providers: [
        MovieService,
        { provide: MovieService, useClass: MockMovieService },
      ],
    });
    service = TestBed.inject(MovieService);
    service = new MovieService(<any>httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of movies when httpClient is called', () => {
    const expectedMovies: Movie[] = [
      {
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
      },
      {
        Id: 89,
        Title: 'The Departed',
        Descr: 'An undercover cop and a mole in the police attempt...',
        ImgUrl: 'some url',
        ReleaseYear: 2006,
        Category: [{ categoryId: 6, category: 'thriller' }],
        Price: 100,
      },
      {
        Id: 83,
        Title: 'City Light',
        Descr: 'With the aid of a wealthy erratic tippler...',
        ImgUrl: 'some url',
        ReleaseYear: 1931,
        Category: [{ categoryId: 7, category: 'comedy' }],
        Price: 100,
      },
    ];

    httpClientSpy.get.and.returnValue(expectedMovies);
    service.moviesSource.subscribe(
      (movies) => expect(movies).toEqual(expectedMovies),
      fail
    );
    expect(expectedMovies.length).toEqual(3);
  });

  it('should return a list of categories when httpClient is called', () => {
    const expectedCategories: Category[] = [
      { id: 5, name: 'action' },
      { id: 6, name: 'thriller' },
      { id: 7, name: 'comedy' },
      { id: 8, name: 'sci-fi' },
    ];

    httpClientSpy.get.and.returnValue(expectedCategories);
    service.categoriesSource.subscribe(
      (cats) => expect(cats).toEqual(expectedCategories),
      fail
    );
    expect(expectedCategories.length).toEqual(4);
  });
});
