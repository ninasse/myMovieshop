import { Subject } from 'rxjs';
import Movie from 'src/app/models/Movie';
import IMovieService from './IMovieService';
import Category from 'src/app/models/Category';

export default class MockMovieService implements IMovieService {
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

  catsFromAPI: Category[] = [
    { id: 5, name: 'action' },
    { id: 6, name: 'thriller' },
    { id: 7, name: 'comedy' },
    { id: 8, name: 'sci-fi' },
  ];

  filteredMovieList: Movie[] = [];
  moviesSource: Subject<Movie[]> = new Subject<Movie[]>();
  selectedMovieSource: Subject<Movie> = new Subject<Movie>();
  moviesFilteredByGenre: Subject<Movie[]> = new Subject<Movie[]>();
  categoriesSource: Subject<Category[]> = new Subject<Category[]>();
  selectedCategorySource: Subject<Category> = new Subject<Category>();

  getMoviesFromApi(): void {
    this.moviesSource.next(this.movies);
  }

  getCategoriesFromApi() {
    this.categoriesSource.next(this.catsFromAPI);
  }

  getFilteredByCategory(category: Category) {
    this.filteredMovieList = [];
    this.movies.forEach((movie: Movie) => {
      movie.Category.forEach((element) => {
        if (category.id == element.categoryId) {
          console.log(element.categoryId);
          this.filteredMovieList.push(movie);
        }
      });
    });
    this.moviesFilteredByGenre.next(this.filteredMovieList);
  }
}
