import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movieService/movie.service';
import Movie from 'src/app/models/Movie';

@Component({
  selector: 'app-product-information',
  templateUrl: './product-information.component.html',
  styleUrls: ['./product-information.component.scss'],
})
export class ProductInformationComponent implements OnInit {
  id: number;
  selectedMovie: Movie;
  movies: Movie[] = [];
  constructor(private route: ActivatedRoute, private service: MovieService) {}

  ngOnInit(): void {
    this.route.params.subscribe((p) => {
      this.id = p.id;
      console.log(this.id);
    });
    this.service.moviesSource.subscribe((m: Movie[]) => {
      //console.log(m);
      this.selectedMovie = m.find((movie: Movie) => movie.Id == this.id);

      console.log(this.selectedMovie);
    });
    this.service.getMoviesFromApi();
  }
  addToCart() {
    console.log(this.selectedMovie);
    this.service.selectedProductToCart(this.selectedMovie);
  }
}
