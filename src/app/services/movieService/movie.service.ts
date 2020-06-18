import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject, Observable, of } from 'rxjs';
import Movie, { ProductCategory } from '../../models/Movie';
import IMovieService from './IMovieService';
import Category from 'src/app/models/Category';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MovieService implements IMovieService {
  moviesAPI =
    'https://medieinstitutet-wie-products.azurewebsites.net/api/products';
  categoriesAPI =
    'https://medieinstitutet-wie-products.azurewebsites.net/api/categories';
  moviesSource: Subject<Movie[]> = new Subject<Movie[]>();
  selectedMovieSource: Subject<Movie> = new Subject<Movie>();
  moviesFilteredByGenre: Subject<Movie[]> = new Subject<Movie[]>();
  categoriesSource: Subject<Category[]> = new Subject<Category[]>();
  selectedCategorySource: Subject<Category> = new Subject<Category>();
  categories: ProductCategory[] = [];
  filteredMovieList: Movie[] = [];
  movieList: Movie[] = [];
  movie: Movie;
  prodCatList: ProductCategory[] = [];
  productCategory: ProductCategory;

  constructor(private http: HttpClient) {}

  getMoviesFromApi() {
    this.http.get(this.moviesAPI).subscribe((data: any) => {
      let moviesFromAPI: Movie[] = data.map((m) => {
        const movie = new Movie();
        movie.Id = m.id;
        movie.Title = m.name;
        movie.Descr = m.description;
        movie.ImgUrl = m.imageUrl;
        movie.ReleaseYear = m.year;
        movie.Price = m.price;
        let prodCategoryList: ProductCategory[] = m.productCategory.map(
          (mc) => {
            const productCategory = new ProductCategory();
            productCategory.categoryId = mc.categoryId;
            productCategory.category = mc.category;
            return productCategory;
          }
        );
        movie.Category = prodCategoryList;
        this.prodCatList = prodCategoryList;
        return movie;
      });
      this.moviesSource.next(moviesFromAPI);
      this.movieList = moviesFromAPI;
    });
  }

  getCategoriesFromApi() {
    this.http.get(this.categoriesAPI).subscribe((categoryData: any) => {
      let catsFromAPI: Category[] = categoryData.map((cat) => {
        const category = new Category();
        category.id = cat.id;
        category.name = cat.name;
        return category;
      });
      this.categoriesSource.next(catsFromAPI);
    });
  }

  getFilteredByCategory(category: Category) {
    this.filteredMovieList = [];
    this.movieList.forEach((movie: Movie) => {
      movie.Category.forEach((element) => {
        if (category.id == element.categoryId) {
          this.filteredMovieList.push(movie);
        }
      });
    });
    this.moviesFilteredByGenre.next(this.filteredMovieList);
  }

  selectedProductToCart(selectedMovie: Movie) {
    this.selectedMovieSource.next(selectedMovie);
  }

  selectedCategoryToDisplay(selectedCategory: Category) {
    this.selectedCategorySource.next(selectedCategory);
  }
}
