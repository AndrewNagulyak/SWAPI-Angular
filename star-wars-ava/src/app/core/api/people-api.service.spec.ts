import {async, getTestBed, inject, TestBed} from '@angular/core/testing';

import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {BrowserModule} from '@angular/platform-browser';
import {ApiConst} from '../../shared/enums/environment.enum';
import {ApiRoutes} from '../../shared/enums/api-routes.enum';
import {PersonModel} from '../../shared/models/person.model';
import {PeopleApiService} from './people-api.service';
import {PaginationParams, PaginationWrapper} from '../../shared/models/pagination-wrapper';

const BASE_URL = ApiConst.baseUrl + ApiRoutes.people;
const MOCK_DATA: PersonModel[] = [
  {
    birth_year: '20BBY',
    films: ['1,3'],
    name: 'Person 1',
    species: ['1'],
    starships: ['2'],
    url: '1'
  }, {
    birth_year: '20ABY',
    films: ['2,3'],
    name: 'Person 2',
    species: ['2'],
    starships: ['1'],
    url: '2'
  }
];
const pagParams = {page: 1, limit: 10};


describe('People Service', () => {
  let injector: TestBed;
  let service: PeopleApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule, HttpClientModule, HttpClientTestingModule
      ],
      providers: [PeopleApiService]
    });

    injector = getTestBed();
    service = injector.get(PeopleApiService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', inject([PeopleApiService], (svg: PeopleApiService) => {
    expect(svg).toBeTruthy();
  }));

  it('should get list of all people', async(() => {
    service
    .getAll(pagParams)
    .subscribe((data: { people: PaginationWrapper<PersonModel>, pagParams: PaginationParams }) => {
      expect(data.people.results.length).toBe(2);
      expect(data.people.results[0]).toBe(MOCK_DATA[0]);
      expect(data.people.results[1]).toBe(MOCK_DATA[1]);
    });

    const req = httpMock.expectOne(BASE_URL + `?page=${pagParams.page}`);
    expect(req.request.method).toBe('GET');
    req.flush({results: MOCK_DATA, count: 2, page: 1} as
      PaginationWrapper<PersonModel>);
  }));

  it('should get person by id', async(() => {
    const id = 1;
    service
    .getById('1')
    .subscribe((response: PersonModel) => {
      expect(response).toBe(MOCK_DATA[0]);
    });

    const req = httpMock.expectOne(`${BASE_URL}/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(MOCK_DATA[0]);
  }));

});

