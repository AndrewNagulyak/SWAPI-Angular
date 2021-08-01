import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiRoutes} from '../../shared/enums/api-routes.enum';
import {ApiConst} from '../../shared/enums/environment.enum';
import {Observable} from 'rxjs';
import {PersonModel} from '../../shared/models/person.model';
import {map} from 'rxjs/operators';
import {SpecieModel} from '../../shared/models/specie.model';
import {PaginationWrapper} from '../../shared/models/pagination-wrapper';
import {MovieModel} from '../../shared/models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class SpeciesApiService {

  constructor(private http: HttpClient) {
  }

  getById(id: string): Observable<SpecieModel> {
    return this.http.get<SpecieModel>(ApiConst.baseUrl + ApiRoutes.species + '/' + id).pipe(map((spc) => {
      spc.url = spc.url.replace('https://swapi.dev/api/species/', '').replace('/', '');
      spc.discriminator = 'species';
      return spc;
    }));
  }

  getAll(): Observable<PaginationWrapper<SpecieModel>> {
    return this.http.get<PaginationWrapper<SpecieModel>>(ApiConst.baseUrl + ApiRoutes.species).pipe(map((species) => {
      species.results = species.results.map((specie) => {
        specie.url = specie.url.replace('https://swapi.dev/api/species/', '').replace('/', '');
        specie.discriminator = 'species';
        return specie;
      });
      return species;
    }));
  }
}
