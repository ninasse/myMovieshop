import { Subject } from 'rxjs';
import Movie from 'src/app/models/Movie';

export default interface IMovieService {
  moviesSource: Subject<Movie[]>;
  selectedMovieSource: Subject<Movie>;

  getMoviesFromApi(): void;
}
