import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movieService/movie.service';
import Movie from 'src/app/models/Movie';
import { CartService } from 'src/app/services/cartService/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  movies: Movie[] = [];
  constructor(
    private movieService: MovieService,
    private cartService: CartService
  ) {}
  addProductToCart(selectedMovie: Movie) {
    this.cartService.addItemToCart(selectedMovie);
    //console.log(`${selectedMovie.Id}HAS BEEN ADDED TO CART`);
  }
  ngOnInit(): void {
    this.movieService.moviesSource.subscribe((m: Movie[]) => {
      //console.log(m);
      this.movies = m;
    });
    this.movieService.selectedMovieSource.subscribe((movie: Movie) => {
      this.addProductToCart(movie);
    });
    this.movieService.getMoviesFromApi();
  }
}
