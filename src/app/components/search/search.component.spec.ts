import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import MockMovieService from 'src/app/services/movieService/MockMovieService';
import { MovieService } from 'src/app/services/movieService/movie.service';
import { SearchService } from 'src/app/services/searchService/search.service';
import { MockSearchService } from 'src/app/services/searchService/MockSearchService';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent],
      providers: [
        SearchComponent,
        { provide: SearchService, useClass: MockSearchService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
