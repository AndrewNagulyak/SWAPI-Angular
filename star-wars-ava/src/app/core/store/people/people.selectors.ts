import {createFeatureSelector, createSelector} from '@ngrx/store';
import {PeopleActionTypes} from './people.actions';
import {PersonModel} from '../../../shared/models/person.model';
import {PaginationParams} from '../../../shared/models/pagination-wrapper';
import {PeopleState} from './people.reducer';
import {isInitFilterState} from '../../../shared/helpers/isNotInitFilterState';

export const getPeopleState = createFeatureSelector<PeopleState>('people');

export const getAllPeople = createSelector(getPeopleState, (state: PeopleState) => state);
export const getPerson = (personId) =>
  createSelector(getPeopleState, state => {
    const foundPerson = state.data.find(person => (!!person && (person.url === personId)));
    return foundPerson ? foundPerson : null;
  });

export const getPeopleError = createSelector(getPeopleState, (state: PeopleState) => {
  return state.action === PeopleActionTypes.GetPeople
    ? state.error
    : null;
});
export const getPersonError = createSelector(getPeopleState, (state: PeopleState) => {
  return state.action === PeopleActionTypes.GetPerson
    ? state.error
    : null;
});

export const selectAllPeoplePage = (page: PaginationParams) => createSelector(getAllPeople, personState => {
  if ((personState.action === PeopleActionTypes.GetPeople && personState.done)
    || personState.action === PeopleActionTypes.PageChange
    || personState.action === PeopleActionTypes.ChangePeopleFilter) {
    if (personState.filterModel && !isInitFilterState(personState.filterModel)) {
      return {results: personState.filteredData as PersonModel[], count: personState.totalPage, page: personState.page};
    }
    const findPage = personState.page;
    const cachePages = personState.cachePage;
    const filteredData = personState.data;
    if (cachePages.includes(findPage)) {
      const start = (personState.page - 1) * page.limit;
      const end = start + page.limit;
      return {results: (filteredData.slice(start, end)) as PersonModel[], count: personState.totalPage, page: personState.page};
    } else {
      return {results: [] as PersonModel[], count: null, action: personState.action, page: personState.page};
    }
  } else {
    return null;
  }
});


// function compareDates(a: PersonModel, b: PersonModel) {
//   if (moment(a.viewedDate).diff(b.viewedDate)) {
//     return -1;
//   } else {
//     return 1;
//   }
// }

