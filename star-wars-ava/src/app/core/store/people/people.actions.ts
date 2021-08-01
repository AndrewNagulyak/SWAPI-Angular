import {Action} from '@ngrx/store';
import {PersonModel} from '../../../shared/models/person.model';
import {PaginationParams, PaginationWrapper} from '../../../shared/models/pagination-wrapper';
import {FilterModel} from '../../../shared/models/filter.model';

export enum PeopleActionTypes {

  GetPeople = '[People] Get People',
  GetPeopleSuccess = '[People] Get People Success',
  GetPeopleError = '[People] Get People Error',
  PageChange = '[People] Get PageChanged',

  GetPerson = '[People] Get Person by Id',
  GetPersonSuccess = '[People] Get Person by Id Success',
  GetPersonError = '[People] Get Person by Id Error',

  ChangePeopleFilter = '[People] Get People With Filter',
  UpdatePerson = '[People] Update Person',
}


// Get All

export class PageChangeAction implements Action {
  readonly type = PeopleActionTypes.PageChange;

  constructor(public payload: { page: number }) {
  }
}

export class GetPeopleAction implements Action {
  readonly type = PeopleActionTypes.GetPeople;

  constructor(public payload: { pagParams: PaginationParams }) {
  }
}

export class ChangePeopleFilterAction implements Action {
  readonly type = PeopleActionTypes.ChangePeopleFilter;

  constructor(public payload: { filterModel: FilterModel, filterData: PersonModel[] }) {
  }
}

export class GetPeopleSuccessAction implements Action {
  readonly type = PeopleActionTypes.GetPeopleSuccess;

  constructor(public payload: { people: PaginationWrapper<PersonModel>, pagParams: PaginationParams }) {
  }
}

export class GetPeopleErrorAction implements Action {
  readonly type = PeopleActionTypes.GetPeopleError;

  constructor(public payload: Error) {
  }
}

// Get By Id
export class GetPersonAction implements Action {
  readonly type = PeopleActionTypes.GetPerson;

  constructor(public payload: string) {
  }
}

export class GetPersonSuccessAction implements Action {
  readonly type = PeopleActionTypes.GetPersonSuccess;

  constructor(public payload: PersonModel) {
  }
}

export class GetPersonErrorAction implements Action {
  readonly type = PeopleActionTypes.GetPersonError;

  constructor(public payload: Error) {
  }
}


export class UpdatePersonAction implements Action {
  readonly type = PeopleActionTypes.UpdatePerson;

  constructor(public payload: PersonModel) {
  }
}


export type PeopleActions = GetPersonAction | GetPersonSuccessAction | GetPersonErrorAction | UpdatePersonAction
  | GetPeopleAction | GetPeopleErrorAction | GetPeopleSuccessAction | PageChangeAction | ChangePeopleFilterAction;
