import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { SearchService } from './search.service';
import { MockSearchService } from './MockSearchService';

describe('SearchService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let service: SearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SearchService,
        { provide: SearchService, useClass: MockSearchService },
      ],
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = TestBed.inject(SearchService);
    service = new SearchService(<any>httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
