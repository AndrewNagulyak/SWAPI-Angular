import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {forkJoin, Observable, of} from 'rxjs';
import {PersonModel} from '../../../shared/models/person.model';
import {PeopleService} from '../../../core/services/people.service';
import {filter, first, map, mergeMap, tap} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../reducers';
import {getSpeciesById} from '../../../core/store/species/species.selectors';
import {GetSpeciesAction} from '../../../core/store/species/species.actions';
import {getMoviesById} from '../../../core/store/movies/movies.selectors';
import {GetMovieAction} from '../../../core/store/movies/movies.actions';
import {GetStarshipAction} from '../../../core/store/starships/starships.actions';
import {getstarshipById} from '../../../core/store/starships/starships.selectors';
import {UpdatePersonAction} from '../../../core/store/people/people.actions';

@Injectable({
  providedIn: 'root'
})
export class PersonDetailsResolver implements Resolve<PersonModel> {
  person: PersonModel;

  constructor(private personService: PeopleService, private state: Store<AppState>) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PersonModel> {
    const personId = route.params.id;
    return this.personService.getById(personId).pipe(map((person: any) => {
        this.person = person;
        return person;
      }),
      mergeMap((personResp: PersonModel) => {
        const requestArray: Observable<any>[] = [];
        if (!personResp.speciesModels) {
          if (personResp.species.length) {
            personResp.species.map((spc) => {
              const spcId = spc
              .replace('https://swapi.dev/api/species/', '').replace('/', '');
              requestArray.push(this.state.pipe(select(getSpeciesById(spcId)), tap(specie => {
                if (!specie) {
                  this.state.dispatch(new GetSpeciesAction(spcId));
                }
              }), filter(specie => !!specie), first()));
            });
          }
        }
        if (!personResp.filmsModel) {
          if (personResp.films.length) {
            personResp.films.map((filmUrl) => {
              const filmId = filmUrl
              .replace('https://swapi.dev/api/films/', '').replace('/', '');
              requestArray.push(this.state.pipe(select(getMoviesById(filmId)), tap(film => {
                if (!film) {
                  this.state.dispatch(new GetMovieAction({id: filmId}));
                }
              }), filter(movie => !!movie), first()));
            });
          }
        }
        if (!personResp.starshipsModel) {
          if (personResp.starships.length) {
            personResp.starships.map((starshipUrl) => {
              const starshipId = starshipUrl
              .replace('https://swapi.dev/api/starships/', '').replace('/', '');
              requestArray.push(this.state.pipe(select(getstarshipById(starshipId)), tap(starship => {
                if (!starship) {
                  this.state.dispatch(new GetStarshipAction(starshipId));
                }
              }), filter(starship => !!starship), first()));
            });
          }
        }
        return requestArray.length ? forkJoin(...requestArray) : of([]);
      }),
      mergeMap((responses: any) => {
        if (responses.length) {
          const speciesModels = [];
          const starshipsModel = [];
          const filmsModel = [];
          responses.map(response => {
            switch (response.discriminator) {
              case 'species':
                speciesModels.push(response);
                break;
              case 'starship':
                starshipsModel.push(response);
                break;
              case 'movie':
                filmsModel.push(response);
                break;
            }
          });
          const updateObject: PersonModel = {
            ...this.person,
            filmsModel,
            starshipsModel,
            speciesModels
          };
          this.state.dispatch(new UpdatePersonAction(updateObject));
          return of(updateObject);
        }
        // this.person.speciesModels = [...responses];
        // const person = {...this.person, speciesModels: responses};
        return of(this.person);
      }));

  }
}
