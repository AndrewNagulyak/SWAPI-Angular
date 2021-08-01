import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PersonModel} from '../../shared/models/person.model';
import {ApiConst} from '../../shared/enums/environment.enum';
import {ApiRoutes} from '../../shared/enums/api-routes.enum';
import {map} from 'rxjs/operators';
import {StarshipModel} from '../../shared/models/starship.model';

@Injectable({
  providedIn: 'root'
})
export class StarshipApiService {
  constructor(private http: HttpClient) {
  }

  getById(id: string): Observable<StarshipModel> {
    return this.http.get<StarshipModel>(ApiConst.baseUrl + ApiRoutes.starship + '/' + id).pipe(map((startship) => {
      startship.url = startship.url.replace('https://swapi.dev/api/starships/', '').replace('/', '');
      startship.discriminator = 'starship';
      return startship;
    }));
  }
}
