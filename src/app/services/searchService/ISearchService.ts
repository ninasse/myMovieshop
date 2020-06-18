import { Subject } from 'rxjs';
import Movie, { ProductCategory } from 'src/app/models/Movie';

export default interface ISearchService {
  moviesSource: Subject<Movie[]>;
  prodCatList: ProductCategory[];
  searchMovies(searchTerm): void;
}
