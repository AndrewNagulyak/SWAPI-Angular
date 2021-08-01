import {PersonModel} from '../../../shared/models/person.model';
import {PeopleActions, PeopleActionTypes} from './people.actions';
import {FilterModel} from '../../../shared/models/filter.model';


export const boardsFeatureKey = 'people';

export interface PeopleState {
  data: PersonModel[];
  selected: PersonModel;
  action: string;
  filteredData: PersonModel[];
  filterModel: FilterModel;
  totalPage: number;
  page: number;
  done: boolean;
  cachePage: number[];
  error?: Error;
}

export const initialState: PeopleState = {
  data: [],
  filteredData: [],
  totalPage: 0,
  cachePage: [],
  filterModel: null,
  done: false,
  page: 1,
  selected: null,
  action: null,
  error: null
};

export function peopleReducer(state = initialState, action: PeopleActions): PeopleState {
  switch (action.type) {
    case PeopleActionTypes.GetPeople:
      return {
        ...state,
        action: PeopleActionTypes.GetPeople,
        done: false,
        selected: null,
        error: null
      };
    case PeopleActionTypes.PageChange :
      return {
        ...state,
        page: action.payload.page,
        action: PeopleActionTypes.PageChange,
        selected: null,
        done: false,
        filterModel: {selectedDateRange: [-400, 400], selectedSpecie: '-1', selectedMovie: '-1'},
        filteredData: [],
        error: null
      };
    case PeopleActionTypes.GetPeopleSuccess :
      // pages that are cached
      const cachePage = [...state.cachePage];
      if (!cachePage.includes(action.payload.pagParams.page)) {
        cachePage.push(action.payload.pagParams.page);
      }
      // ...beforedata + ...currentUncachedData + ...afterData = result
      let beforeData = [];
      if (action.payload.pagParams.page > 1) {
        beforeData = state.data.slice(0, (action.payload.pagParams.page - 1) * action.payload.pagParams.limit);
        if (beforeData.length < (action.payload.pagParams.page - 1) * action.payload.pagParams.limit) {
          const missingElements = (action.payload.pagParams.page - 1) * action.payload.pagParams.limit - beforeData.length;
          for (let step = 0; step < missingElements; step++) {
            beforeData.push(null);
          }
        }
      }
      const afterData = state.data.slice(action.payload.pagParams.limit * action.payload.pagParams.page, state.data.length);
      const finalData = [...beforeData, ...action.payload.people.results, ...afterData];
      return {
        ...state,
        data: finalData,
        totalPage: action.payload.people.count,
        cachePage,
        done: true,
        selected: null,
        error: null
      };
    case PeopleActionTypes.GetPeopleError :
      return {
        ...state,
        selected: null,
        error: action.payload,
      };
    case PeopleActionTypes.GetPersonSuccess :
      const replacePersonIndex = state.data.findIndex((person: PersonModel) => person && person.url === action.payload.url);
      let newData;
      if (replacePersonIndex > -1) {
        newData = [...state.data];
        newData[replacePersonIndex] = action.payload;
      } else {
        newData = [...state.data, action.payload];
      }
      return {
        ...state,
        data: newData,
        done: false,
        action: PeopleActionTypes.GetPerson,
        error: null
      };
    case PeopleActionTypes.GetPersonError :
      return {
        ...state,
        done: true,
        selected: null,
        error: action.payload
      };
    case PeopleActionTypes.ChangePeopleFilter : {
      return {
        ...state,
        action: PeopleActionTypes.ChangePeopleFilter,
        filterModel: action.payload.filterModel,
        filteredData: action.payload.filterData,
      };
    }
    case PeopleActionTypes.UpdatePerson : {
      const newPerson = action.payload;
      const data = [...state.data];
      const personIndex = data.findIndex(person => person.url === newPerson.url);
      data[personIndex] = {...newPerson};
      return {
        ...state,
        data,
        selected: null,
        error: null,
        done: true
      };
    }


    default:
      return state;
  }

}
