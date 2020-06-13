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
    console.log(this.selectedCategory);
    this.movieService.getFilteredByCategory(this.selectedCategory);
  }
  addToCart(selectedMovie: Movie) {
    this.cartService.addItemToCart(selectedMovie);
    //console.log(`${selectedMovie.Id}HAS BEEN ADDED TO CART`);
  }
  ngOnInit(): void {
    this.movieService.moviesSource.subscribe((m: Movie[]) => {
      //console.log(m);
      this.movies = m;
    });
    this.movieService.getMoviesFromApi();
    this.movieService.categoriesSource.subscribe((cats: Category[]) => {
      this.categories = cats;
    });
    this.movieService.getCategoriesFromApi();
  }
}
