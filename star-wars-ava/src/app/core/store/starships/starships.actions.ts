import {Action} from '@ngrx/store';
import {StarshipModel} from '../../../shared/models/starship.model';

export enum StarshipsActionTypes {

  GetStarship = '[Starships] Get Starship by Id',
  GetStarshipSuccess = '[Starships] Get Starship by Id Success',
  GetStarshipError = '[Starships] Get Starship by Id Error',

}

// Get By Id
export class GetStarshipAction implements Action {
  readonly type = StarshipsActionTypes.GetStarship;

  constructor(public payload: string) {
  }
}

export class GetStarshipSuccessAction implements Action {
  readonly type = StarshipsActionTypes.GetStarshipSuccess;

  constructor(public payload: StarshipModel) {
  }
}

export class GetStarshipErrorAction implements Action {
  readonly type = StarshipsActionTypes.GetStarshipError;

  constructor(public payload: Error) {
  }
}


export type StarshipsActions = GetStarshipAction | GetStarshipSuccessAction | GetStarshipErrorAction;
