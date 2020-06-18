import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Movie, { ProductCategory } from 'src/app/models/Movie';
import { Subject } from 'rxjs';
import ISearchService from './ISearchService';

@Injectable({
  providedIn: 'root',
})
export class SearchService implements ISearchService {
  moviesSource: Subject<Movie[]> = new Subject<Movie[]>();
  prodCatList: ProductCategory[] = [];
  constructor(private http: HttpClient) {}

  searchMovies(searchTerm: string) {
    this.http
      .get(
        'https://medieinstitutet-wie-products.azurewebsites.net/api/products?name=' +
          searchTerm
      )
      .subscribe((data: any) => {
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
      });
  }
}
