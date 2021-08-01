import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {GetStarshipAction, GetStarshipErrorAction, GetStarshipSuccessAction, StarshipsActionTypes} from './starships.actions';
import {StarshipApiService} from '../../api/starship-api.service';


@Injectable()
export class StarshipsEffects {


  constructor(private actions$: Actions, private starShipService: StarshipApiService) {
  }

  @Effect()
  getStarship$ = this.actions$.pipe(
    ofType(StarshipsActionTypes.GetStarship),
    map((action: GetStarshipAction) => action.payload),
    mergeMap(id => this.starShipService.getById(id)),
    map(spc => new GetStarshipSuccessAction(spc)),
    catchError((err) => [new GetStarshipErrorAction(err)])
  );


}
