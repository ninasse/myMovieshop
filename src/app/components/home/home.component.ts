import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movieService/movie.service';
import Movie from 'src/app/models/Movie';
import Category from 'src/app/models/Category';
import { CartService } from 'src/app/services/cartService/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  movies: Movie[] = [];
  filteredMovies: Movie[] = [];
  categories: Category[] = [];
  selectedCategory: Category;
  constructor(
    private movieService: MovieService,
    private cartService: CartService
  ) {}

  filterByCategory(catSelect: Category) {
    this.movieService.selectedCategorySource.subscribe((category: Category) => {
      this.movieService.getFilteredByCategory(catSelect);
    });
    this.selectedCategory = catSelect;
    this.movieService.moviesFilteredByGenre.subscribe((m: Movie[]) => {
      this.filteredMovies = m;
    });
    this.movieService.getFilteredByCategory(this.selectedCategory);
  }
  addToCart(selectedMovie: Movie) {
    this.cartService.addItemToCart(selectedMovie);
  }
  ngOnInit(): void {
    this.movieService.moviesSource.subscribe((m: Movie[]) => {
      this.movies = m;
    });
    this.movieService.getMoviesFromApi();
    this.movieService.categoriesSource.subscribe(
      (listOfCategories: Category[]) => {
        this.categories = listOfCategories;
      }
    );
    this.movieService.getCategoriesFromApi();
  }
}
