import { Injectable } from '@angular/core';
import ISearchService from './ISearchService';
import { Subject } from 'rxjs';
import Movie, { ProductCategory } from 'src/app/models/Movie';

@Injectable({
  providedIn: 'root',
})
export class MockSearchService implements ISearchService {
  private movies: Movie[] = [
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
    {
      Id: 107,
      Title: 'Aliens',
      Descr: 'The moon from Alien (1979) has been colonized,...',
      ImgUrl: 'some url to img',
      ReleaseYear: 1986,
      Category: [{ categoryId: 8, category: 'sci-fi' }],
      Price: 99,
    },
  ];

  moviesSource: Subject<Movie[]> = new Subject<Movie[]>();
  prodCatList: ProductCategory[];

  constructor() {}
  searchMovies(searchTerm): void {
    this.moviesSource.next(this.movies);
  }
}
