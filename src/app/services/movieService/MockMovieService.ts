import { Subject } from 'rxjs';
import Movie from 'src/app/models/Movie';
import IMovieService from './IMovieService';

export default class MockMovieService implements IMovieService {
  private movies: Movie[] = [
    {
      Id: 78,
      Title: 'Frozen',
      Descr: 'Lorem Ipsum',
      ImgUrl: 'some url',
      ReleaseYear: 2015,
      // Category: [{ CatId: number }];
      Price: 100,
    },
    {
      Id: 79,
      Title: 'Titanic',
      Descr: 'Buhu...',
      ImgUrl: 'some url',
      ReleaseYear: 1998,
      // Category: [{ CatId: number }];
      Price: 150,
    },
    {
      Id: 80,
      Title: 'Ice Age',
      Descr: 'Ha ha!!',
      ImgUrl: 'some url',
      ReleaseYear: 2000,
      // Category: [{ CatId: number }];
      Price: 100,
    },
  ];
  moviesSource: Subject<Movie[]>;
  selectedMovieSource: Subject<Movie>;

  getMoviesFromApi(): void {
    this.moviesSource.next(this.movies);
  }
}
