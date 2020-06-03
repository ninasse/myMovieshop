import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import Movie from 'src/app/models/Movie';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  movies: Movie[] = [];
  cart = JSON.parse(localStorage.getItem('movies')) || [];
  constructor(private service: MovieService) {}

  ngOnInit(): void {
    this.service.movies.subscribe((m: Movie[]) => {
      console.log(m);
      this.movies = m;
    });
    this.service.getMoviesFromApi();
  }
}
