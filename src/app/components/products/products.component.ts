import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movieService/movie.service';
import Movie from 'src/app/models/Movie';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  movies: Movie[] = [];
  cart: Movie[] = JSON.parse(localStorage.getItem('Cartitems')) || [];
  q: number;
  constructor(private service: MovieService) {}

  addProductToCart(addedMovie: Movie) {
    let movieIncart = this.cart.find((m) => m.Id === addedMovie.Id);
    console.log(movieIncart);
    if (!movieIncart) {
      this.cart.push({ ...addedMovie });
      localStorage.setItem('Cartitems', JSON.stringify(this.cart));
      return;
    }
    addedMovie.quantity++;
    console.log(`${addedMovie.Id} has been addded to cart!`);
    localStorage.setItem('Cartitems', JSON.stringify(this.cart));
  }
  ngOnInit(): void {
    this.service.moviesSource.subscribe((m: Movie[]) => {
      //console.log(m);
      this.movies = m;
    });
    this.service.selectedMovieSource.subscribe((movie: Movie) => {
      this.addProductToCart(movie);
    });
    this.service.getMoviesFromApi();
  }
}
