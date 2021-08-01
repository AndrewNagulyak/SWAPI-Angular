import {async, getTestBed, inject, TestBed} from '@angular/core/testing';

import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {BrowserModule} from '@angular/platform-browser';
import {ApiConst} from '../../shared/enums/environment.enum';
import {ApiRoutes} from '../../shared/enums/api-routes.enum';
import {PaginationParams, PaginationWrapper} from '../../shared/models/pagination-wrapper';
import {MovieModel} from '../../shared/models/movie.model';
import {MoviesApiService} from './movies-api.service';

const BASE_URL = ApiConst.baseUrl + ApiRoutes.movies;
const MOCK_DATA: MovieModel[] = [
  {
    url: '1',
    title: 'Movie 1',
    characters: ['1', '2']
  }, {
    url: '2',
    title: 'Movie 2',
    characters: ['2', '3']
  }
];
const pagParams = {page: 1, limit: 10};


describe('Movies Service', () => {
  let injector: TestBed;
  let service: MoviesApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule, HttpClientModule, HttpClientTestingModule
      ],
      providers: [MoviesApiService]
    });

    injector = getTestBed();
    service = injector.get(MoviesApiService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', inject([MoviesApiService], (svg: MoviesApiService) => {
    expect(svg).toBeTruthy();
  }));

  it('should get list of all movies', async(() => {
    service
    .getAll()
    .subscribe((data: PaginationWrapper<MovieModel>) => {
      expect(data.results.length).toBe(2);
      expect(data.results[0]).toBe(MOCK_DATA[0]);
      expect(data.results[1]).toBe(MOCK_DATA[1]);
    });

    const req = httpMock.expectOne(BASE_URL);
    expect(req.request.method).toBe('GET');
    req.flush({results: MOCK_DATA, count: 2, page: 1} as
      PaginationWrapper<MovieModel>);
  }));

  it('should get movie by id', async(() => {
    const id = 1;
    service
    .getById('1')
    .subscribe((response: MovieModel) => {
      expect(response).toBe(MOCK_DATA[0]);
    });

    const req = httpMock.expectOne(`${BASE_URL}/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(MOCK_DATA[0]);
  }));

});

