import {Action} from '@ngrx/store';
import {SpecieModel} from '../../../shared/models/specie.model';
import {PaginationWrapper} from '../../../shared/models/pagination-wrapper';

export enum SpeciesActionTypes {

  GetSpecies = '[Species] Get Species by Id',
  GetSpeciesSuccess = '[Species] Get Species by Id Success',
  GetSpeciesError = '[Species] Get Species by Id Error',

  GetSpeciesList = '[Species] Get Species List',
  GetSpeciesListSuccess = '[Species] Get Species List Success',
  GetSpeciesListError = '[Species] Get Species List Error',

}

// Get By Id
export class GetSpeciesAction implements Action {
  readonly type = SpeciesActionTypes.GetSpecies;

  constructor(public payload: string) {
  }
}

export class GetSpeciesSuccessAction implements Action {
  readonly type = SpeciesActionTypes.GetSpeciesSuccess;

  constructor(public payload: SpecieModel) {
  }
}

export class GetSpeciesErrorAction implements Action {
  readonly type = SpeciesActionTypes.GetSpeciesError;

  constructor(public payload: Error) {
  }
}


// Get By Id
export class GetSpeciesListAction implements Action {
  readonly type = SpeciesActionTypes.GetSpeciesList;

  constructor() {
  }
}

export class GetSpeciesListSuccessAction implements Action {
  readonly type = SpeciesActionTypes.GetSpeciesListSuccess;

  constructor(public payload: PaginationWrapper<SpecieModel>) {
  }
}

export class GetSpeciesListErrorAction implements Action {
  readonly type = SpeciesActionTypes.GetSpeciesListError;

  constructor(public payload: Error) {
  }
}


export type SpeciesActions = GetSpeciesAction | GetSpeciesSuccessAction | GetSpeciesErrorAction
  | GetSpeciesListAction | GetSpeciesListErrorAction | GetSpeciesListSuccessAction;
