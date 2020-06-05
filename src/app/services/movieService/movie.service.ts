import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import Movie from '../../models/Movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  moviesSource = new Subject<Movie[]>();
  selectedMovieSource = new Subject<Movie>();

  constructor(private http: HttpClient) {}

  getMoviesFromApi() {
    this.http
      .get(
        'https://medieinstitutet-wie-products.azurewebsites.net/api/products'
      )
      .subscribe((data: any) => {
        //console.log(data);
        let moviesFromApi: Movie[] = data.map((m) => {
          const movie = new Movie();
          movie.quantity = 1;
          movie.Id = m.id;
          movie.Title = m.name;
          movie.Descr = m.description;
          movie.ImgUrl = m.imageUrl;
          movie.ReleaseYear = m.year;
          movie.Price = m.price;
          // movie.Category = m.productCategory.map((m) => {
          //  movie.Category.CatId = m.productCategory.categoryId;
          //  });
          //console.log(movie);
          return movie;
        });
        //console.log(moviesFromApi);
        this.moviesSource.next(moviesFromApi);
      });
  }

  selectedProductToCart(selectedMovie: Movie) {
    this.selectedMovieSource.next(selectedMovie);
    console.log(selectedMovie);
  }
}
