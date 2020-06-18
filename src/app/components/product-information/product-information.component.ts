import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movieService/movie.service';
import Movie from 'src/app/models/Movie';
import { CartService } from 'src/app/services/cartService/cart.service';

@Component({
  selector: 'app-product-information',
  templateUrl: './product-information.component.html',
  styleUrls: ['./product-information.component.scss'],
})
export class ProductInformationComponent implements OnInit {
  id: number;
  selectedMovie: Movie;
  movies: Movie[] = [];
  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((p) => {
      this.id = p.id;
    });
    this.movieService.moviesSource.subscribe((m: Movie[]) => {
      this.selectedMovie = m.find((movie: Movie) => movie.Id == this.id);
    });
    this.movieService.getMoviesFromApi();
  }
  addToCart() {
    this.cartService.addItemToCart(this.selectedMovie);
  }
}
