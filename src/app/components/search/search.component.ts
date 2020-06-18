import { Component, OnInit } from '@angular/core';

import Movie from 'src/app/models/Movie';
import { FormControl } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { SearchService } from 'src/app/services/searchService/search.service';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchInput: FormControl = new FormControl();
  movies: Movie[] = [];
  searchResult: Movie[] = [];

  constructor(private searchService: SearchService) {}
  searchMovies(term: string) {
    this.searchResult = [];
    if (term == '') {
      this.searchResult = [];
      return this.searchResult;
    }
    this.movies.forEach((element) => {
      if (element.Title.includes(term)) {
        this.searchResult.push(element);
        return this.searchResult;
      }
    });
  }
  ngOnInit() {
    this.searchInput.valueChanges
      .pipe(debounceTime(200), distinctUntilChanged())
      .subscribe((searchInput) => this.searchService.searchMovies(searchInput));

    this.searchService.moviesSource.subscribe((m: Movie[]) => {
      this.movies = m;
    });
  }
}
