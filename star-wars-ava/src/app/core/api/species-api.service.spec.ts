import {ApiConst} from '../../shared/enums/environment.enum';
import {ApiRoutes} from '../../shared/enums/api-routes.enum';
import {SpecieModel} from '../../shared/models/specie.model';
import {SpeciesApiService} from './species-api.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {async, getTestBed, inject, TestBed} from '@angular/core/testing';
import {PaginationWrapper} from '../../shared/models/pagination-wrapper';

const BASE_URL = ApiConst.baseUrl + ApiRoutes.species;
const MOCK_DATA: SpecieModel[] = [
  {
    url: '1',
    name: 'Species 1',
    people: ['1', '2']
  }, {
    url: '2',
    name: 'Species 2',
    people: ['2', '3']
  }
];
const pagParams = {page: 1, limit: 10};


describe('Movies Service', () => {
  let injector: TestBed;
  let service: SpeciesApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule, HttpClientModule, HttpClientTestingModule
      ],
      providers: [SpeciesApiService]
    });

    injector = getTestBed();
    service = injector.get(SpeciesApiService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', inject([SpeciesApiService], (svg: SpeciesApiService) => {
    expect(svg).toBeTruthy();
  }));

  it('should get list of all species', async(() => {
    service
    .getAll()
    .subscribe((data: PaginationWrapper<SpecieModel>) => {
      expect(data.results.length).toBe(2);
      expect(data.results[0]).toBe(MOCK_DATA[0]);
      expect(data.results[1]).toBe(MOCK_DATA[1]);
    });

    const req = httpMock.expectOne(BASE_URL);
    expect(req.request.method).toBe('GET');
    req.flush({results: MOCK_DATA, count: 2, page: 1} as
      PaginationWrapper<SpecieModel>);
  }));

  it('should get specie by id', async(() => {
    const id = 1;
    service
    .getById('1')
    .subscribe((response: SpecieModel) => {
      expect(response).toBe(MOCK_DATA[0]);
    });

    const req = httpMock.expectOne(`${BASE_URL}/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(MOCK_DATA[0]);
  }));

});

