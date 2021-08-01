import {peopleReducer, PeopleState} from './people.reducer';
import {PersonModel} from '../../../shared/models/person.model';
import {FilterModel} from '../../../shared/models/filter.model';
import {
  ChangePeopleFilterAction,
  GetPeopleAction,
  GetPeopleErrorAction,
  GetPeopleSuccessAction,
  GetPersonErrorAction,
  GetPersonSuccessAction,
  PageChangeAction,
  PeopleActionTypes,
  UpdatePersonAction
} from './people.actions';


let MOCK_DATA: PersonModel[];
const filterModel: FilterModel = {selectedDateRange: [0, 0], selectedSpecie: '1', selectedMovie: '1'};
const pagParams = {page: 1, limit: 2};
let state: PeopleState;
beforeAll(() => {
  state = {
    data: [],
    selected: null,
    action: null,
    filteredData: [],
    filterModel: null,
    totalPage: 0,
    page: 0,
    done: false,
    cachePage: [],
    error: null
  };
  MOCK_DATA = [
    {
      birth_year: '20BBY',
      films: ['1,3'],
      name: 'Person 1',
      species: ['1'],
      starships: ['2'],
      url: '1'
    }, {
      birth_year: '20ABY',
      films: ['2,3'],
      name: 'Person 2',
      species: ['2'],
      starships: ['1'],
      url: '2'
    }
  ];
});


describe('Load all People REDUCER', () => {
  it('should reduce the action GetPeople', () => {
    const action = new GetPeopleAction({pagParams});
    const newState = peopleReducer(state, action);
    expect({...newState}).toEqual({
      ...state,
      action: PeopleActionTypes.GetPeople,
      done: false,
      selected: null,
      error: null
    });
    state = newState;
  });
  it('should reduce the action PageChange', () => {
    const action = new PageChangeAction({page: pagParams.page});
    const newState = peopleReducer(state, action);
    expect({...newState}).toEqual({
      ...state,
      page: action.payload.page,
      action: PeopleActionTypes.PageChange,
      selected: null,
      done: false,
      filterModel: {selectedDateRange: [-400, 400], selectedSpecie: '-1', selectedMovie: '-1'},
      filteredData: [],
      error: null
    });
    state = newState;
  });
  it('should reduce the action GetPeopleSuccess with page 1', () => {
    const payload = {
      people: {results: [...MOCK_DATA], count: MOCK_DATA.length, page: 1},
      pagParams
    };
    const action = new GetPeopleSuccessAction(payload);
    const newState = peopleReducer(state, action);
    const cachePage = [...state.cachePage];
    if (!cachePage.includes(1)) {
      cachePage.push(1);
    }
    const beforeData = [];
    const afterData = state.data.slice(2, state.data.length);
    const finalData = [...beforeData, ...action.payload.people.results, ...afterData];
    expect({...newState}).toEqual({
      ...state,
      data: finalData,
      totalPage: action.payload.people.count,
      cachePage,
      done: true,
      selected: null,
      error: null
    });
    state = newState;
  });
  it('should reduce the action GetPeopleSuccess with page 2', () => {
    const payload = {
      people: {results: [...MOCK_DATA], count: MOCK_DATA.length, page: 2},
      pagParams: {page: 2, limit: 2}
    };
    const action = new GetPeopleSuccessAction(payload);
    const newState = peopleReducer(state, action);
    const cachePage = [...state.cachePage];
    if (!cachePage.includes(2)) {
      cachePage.push(2);
    }
    const beforeData = state.data.slice(0, 2);
    if (beforeData.length < 2) {
      const missingElements = 2 - beforeData.length;
      for (let step = 0; step < missingElements; step++) {
        beforeData.push(null);
      }
    }
    const afterData = state.data.slice(4, state.data.length);
    const finalData = [...beforeData, ...action.payload.people.results, ...afterData];
    expect({...newState}).toEqual({
      ...state,
      data: finalData,
      totalPage: action.payload.people.count,
      cachePage,
      done: true,
      selected: null,
      error: null
    });
    state = newState;
  });
  it('should reduce the action GetPeopleError', () => {
    const payload = new Error('Error loading all people');
    const action = new GetPeopleErrorAction(payload);
    const newState = peopleReducer(state, action);
    expect({...newState}).toEqual({
      ...state,
      selected: null,
      error: action.payload,
    });
  });
});

describe('GET person by url REDUCER', () => {
  it('should reduce the action GetPersonSuccess', () => {
    const payload = {...MOCK_DATA[0], url: '4'};
    const action = new GetPersonSuccessAction(payload);
    const newState = peopleReducer(state, action);
    const newData = [...state.data, action.payload];
    expect({...newState}).toEqual({
      ...state,
      data: newData,
      done: false,
      action: PeopleActionTypes.GetPerson,
      error: null
    });
    state = newState;
  });
  it('should reduce the action GetPersonError', () => {
    const payload = new Error('Error loading the person');
    const action = new GetPersonErrorAction(payload);
    const newState = peopleReducer(state, action);
    expect({...newState}).toEqual({
      ...state,
      done: true,
      selected: null,
      error: action.payload
    });
    state = newState;
  });
});

describe('ChangePeopleFilter Reducer', () => {
  it('should reduce the action ChangePeopleFilter', () => {
    const payload = {
      filterModel: {selectedDateRange: [-400, 400], selectedSpecie: '-1', selectedMovie: '-1'},
      filterData: MOCK_DATA
    };
    const action = new ChangePeopleFilterAction(payload);
    const newState = peopleReducer(state, action);
    expect({...newState}).toEqual({
      ...state,
      action: PeopleActionTypes.ChangePeopleFilter,
      filterModel: action.payload.filterModel,
      filteredData: action.payload.filterData,
    });
    state = newState;
  });
});

describe('Update existing person REDUCER', () => {
  it('should reduce the action UpdatePerson', () => {
    const payload = {...MOCK_DATA[0], name: 'Person3'};
    const action = new UpdatePersonAction(payload);
    state.data = MOCK_DATA;
    const newState = peopleReducer(state, action);
    const index = 0;
    const data = [
      ...state.data.slice(0, index),
      payload,
      ...state.data.slice(index + 1)
    ];
    expect({...newState}).toEqual({
      ...state,
      data,
      selected: null,
      error: null,
      done: true
    });
    state = newState;
  });
});
