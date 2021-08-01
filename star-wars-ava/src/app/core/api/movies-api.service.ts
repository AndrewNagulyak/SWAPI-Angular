import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiRoutes} from '../../shared/enums/api-routes.enum';
import {ApiConst} from '../../shared/enums/environment.enum';
import {Observable} from 'rxjs';
import {MovieModel} from '../../shared/models/movie.model';
import {map} from 'rxjs/operators';
import {PaginationWrapper} from '../../shared/models/pagination-wrapper';
import {PersonModel} from '../../shared/models/person.model';

@Injectable({
  providedIn: 'root'
})
export class MoviesApiService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<PaginationWrapper<MovieModel>> {
    return this.http.get<PaginationWrapper<MovieModel>>(ApiConst.baseUrl + ApiRoutes.movies).pipe(map((movies) => {
      movies.results = movies.results.map((movie) => {
        movie.url = movie.url.replace('https://swapi.dev/api/films/', '').replace('/', '');
        movie.discriminator = 'movie';
        return movie;
      });
      return movies;
    }));
  }

  getById(id: string): Observable<MovieModel> {
    return this.http.get<MovieModel>(ApiConst.baseUrl + ApiRoutes.movies + '/' + id).pipe(map((film) => {
      film.url = film.url.replace('https://swapi.dev/api/films/', '').replace('/', '');
      film.discriminator = 'movie';
      return film;
    }));
  }

}
