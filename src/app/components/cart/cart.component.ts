import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cartService/cart.service';
import Movie from 'src/app/models/Movie';
import { MovieService } from 'src/app/services/movieService/movie.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart = [];
  movieId: number;
  movieIncart;

  constructor(
    private cartService: CartService,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.movieService.selectedMovieSource.subscribe((movie: Movie) => {
      //this.removeFromCart(movie);
      this.movieId = movie.Id;
    });

    this.cart = this.cartService.getCartItems();
    console.log(this.movieId);
  }
  decreaseFromCart(selectedMovie) {
    this.cartService.decreaseCartItem(selectedMovie);
    console.log(`${selectedMovie.Id} TO BE REMOVED`);
  }
}
