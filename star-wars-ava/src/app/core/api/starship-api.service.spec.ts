import {ApiConst} from '../../shared/enums/environment.enum';
import {ApiRoutes} from '../../shared/enums/api-routes.enum';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {async, getTestBed, inject, TestBed} from '@angular/core/testing';
import {StarshipModel} from '../../shared/models/starship.model';
import {StarshipApiService} from './starship-api.service';

const BASE_URL = ApiConst.baseUrl + ApiRoutes.starship;
const MOCK_DATA: StarshipModel[] = [
  {
    url: '1',
    name: 'Starships 1',
  }, {
    url: '2',
    name: 'Starships 2',
  }
];
const pagParams = {page: 1, limit: 10};


describe('Movies Service', () => {
  let injector: TestBed;
  let service: StarshipApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule, HttpClientModule, HttpClientTestingModule
      ],
      providers: [StarshipApiService]
    });

    injector = getTestBed();
    service = injector.get(StarshipApiService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', inject([StarshipApiService], (svg: StarshipApiService) => {
    expect(svg).toBeTruthy();
  }));

  it('should get starship by id', async(() => {
    const id = 1;
    service
    .getById('1')
    .subscribe((response: StarshipModel) => {
      expect(response).toBe(MOCK_DATA[0]);
    });

    const req = httpMock.expectOne(`${BASE_URL}/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(MOCK_DATA[0]);
  }));

});

