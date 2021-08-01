import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {
  GetSpeciesAction,
  GetSpeciesErrorAction,
  GetSpeciesListErrorAction, GetSpeciesListSuccessAction,
  GetSpeciesSuccessAction,
  SpeciesActionTypes
} from './species.actions';
import {SpeciesApiService} from '../../api/species-api.service';


@Injectable()
export class SpeciesEffects {


  constructor(private actions$: Actions, private specService: SpeciesApiService) {
  }

  @Effect()
  getSpecie$ = this.actions$.pipe(
    ofType(SpeciesActionTypes.GetSpecies),
    map((action: GetSpeciesAction) => action.payload),
    mergeMap(id => this.specService.getById(id)),
    map(spc => new GetSpeciesSuccessAction(spc)),
    catchError((err) => [new GetSpeciesErrorAction(err)])
  );

  @Effect()
  getListSpecies$ = this.actions$.pipe(
    ofType(SpeciesActionTypes.GetSpeciesList),
    map((action: GetSpeciesAction) => action.payload),
    mergeMap(() => this.specService.getAll()),
    map(spc => new GetSpeciesListSuccessAction(spc)),
    catchError((err) => [new GetSpeciesListErrorAction(err)])
  );


}
