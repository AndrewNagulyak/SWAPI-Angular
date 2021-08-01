import {Injectable} from '@angular/core';
import {PaginationParams, PaginationWrapper} from '../../shared/models/pagination-wrapper';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ApiConst} from '../../shared/enums/environment.enum';
import {ApiRoutes} from '../../shared/enums/api-routes.enum';
import {PersonModel} from '../../shared/models/person.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PeopleApiService {

  constructor(private http: HttpClient) {
  }

  getAll(pagParams: PaginationParams): Observable<{ people: PaginationWrapper<PersonModel>, pagParams: PaginationParams }> {
    const params = new HttpParams().append('page', (pagParams.page).toString());
    return this.http.get<PaginationWrapper<PersonModel>>
    (ApiConst.baseUrl + ApiRoutes.people, {params}).pipe(map(people => {
      // add To Star Wars Entity id field for routing
      people.results = people.results.map((person) => {
        person.url = person.url.replace('https://swapi.dev/api/people/', '').replace('/', '');
        return person;
      });
      return {people, pagParams};
    }));
  }


  getById(id: string): Observable<PersonModel> {
    return this.http.get<PersonModel>(ApiConst.baseUrl + ApiRoutes.people + '/' + id).pipe(map((person) => {
      person.url = person.url.replace('https://swapi.dev/api/people/', '').replace('/', '');
      return person;
    }));
  }
}
