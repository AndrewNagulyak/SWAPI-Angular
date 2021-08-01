import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {Action} from '@ngrx/store';
import {
  GetPeopleAction,
  GetPeopleErrorAction,
  GetPeopleSuccessAction,
  GetPersonAction,
  GetPersonErrorAction,
  GetPersonSuccessAction,
  PeopleActionTypes,
} from './people.actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {PeopleApiService} from '../../api/people-api.service';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class PeopleEffects {


  constructor(private actions$: Actions, private peopleService: PeopleApiService) {
  }

  @Effect()
  getAllPeople$: Observable<Action> = this.actions$.pipe(
    ofType<GetPeopleAction>(PeopleActionTypes.GetPeople),
    mergeMap(action => this.peopleService.getAll(action.payload.pagParams)),
    map(people => new GetPeopleSuccessAction(people)),
    catchError((err) => [new GetPeopleErrorAction(err)])
  );

  @Effect()
  getPerson$ = this.actions$.pipe(
    ofType<GetPersonAction>(PeopleActionTypes.GetPerson),
    map((action: GetPersonAction) => action.payload),
    mergeMap(id => this.peopleService.getById(id)),
    map(person => new GetPersonSuccessAction(person)),
    catchError((err) => [new GetPersonErrorAction(err)])
  );


}
