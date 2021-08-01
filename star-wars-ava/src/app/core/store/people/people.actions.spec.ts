import {PersonModel} from '../../../shared/models/person.model';
import {
  ChangePeopleFilterAction,
  GetPeopleAction,
  GetPeopleErrorAction,
  GetPeopleSuccessAction,
  GetPersonAction,
  GetPersonErrorAction,
  GetPersonSuccessAction,
  PageChangeAction,
  PeopleActionTypes,
  UpdatePersonAction
} from './people.actions';
import {FilterModel} from '../../../shared/models/filter.model';

const MOCK_DATA: PersonModel[] = [
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
const filterModel: FilterModel = {selectedDateRange: [0, 0], selectedSpecie: '1', selectedMovie: '1'};
const pagParams = {page: 1, limit: 10};
/****************************************
 * GET all People
 ****************************************/
describe('Load All People ACTION', () => {
  it('should create the action Get People', () => {
    const action = new GetPeopleAction({pagParams});
    expect({...action}).toEqual({type: PeopleActionTypes.GetPeople, payload: {pagParams}});
  });
  it('should create the action GetPeopleSuccess', () => {
    const payload = {
      people: {results: [...MOCK_DATA], count: MOCK_DATA.length, page: pagParams.page},
      pagParams
    };
    const action = new GetPeopleSuccessAction(payload);
    expect({...action}).toEqual({type: PeopleActionTypes.GetPeopleSuccess, payload});
  });
  it('should create the action Get People Errors', () => {
    const payload = new Error('Error loading people');
    const action = new GetPeopleErrorAction(payload);
    expect({...action}).toEqual({
      type: PeopleActionTypes.GetPeopleError, payload
    });
  });
});
/****************************************
 * GET Person
 ****************************************/
describe('Load specific Person ACTION', () => {
  it('should create the action GetPerson', () => {
    const payload = MOCK_DATA[0].url;
    const action = new GetPersonAction(payload);
    expect({...action}).toEqual({type: PeopleActionTypes.GetPerson, payload});
  });
  it('should create the action GetPersonSucces', () => {
    const payload = MOCK_DATA[0];
    const action = new GetPersonSuccessAction(payload);
    expect({...action}).toEqual({type: PeopleActionTypes.GetPersonSuccess, payload});
  });
  it('should create the action GetPersonError', () => {
    const payload = new Error('Error loading the person');
    const action = new GetPersonErrorAction(payload);
    expect({...action}).toEqual({
      type: PeopleActionTypes.GetPersonError, payload
    });
  });
});

/****************************************
 * PageChangeAction
 ****************************************/
describe('Change Page Action', () => {
  it('should create the action PageChange', () => {
    const payload = pagParams.page;
    const action = new PageChangeAction({page: payload});
    expect({...action}).toEqual({
      type: PeopleActionTypes.PageChange,
      payload: {page: payload}
    });
  });
});

/****************************************
 * ChangePeopleFilterAction
 ****************************************/
describe('Change Filter Action', () => {
  it('should create the action ChangePeopleFilter', () => {
    const payload = {filterModel, filterData: MOCK_DATA};
    const action = new ChangePeopleFilterAction(payload);
    expect({...action}).toEqual({
      type: PeopleActionTypes.ChangePeopleFilter,
      payload
    });
  });
});
/****************************************
 * UPDATE person by url
 ****************************************/
describe('Update a Person ACTION', () => {
  it('should create the action UpdatePerson', () => {
    const payload = MOCK_DATA[0];
    const action = new UpdatePersonAction(payload);
    expect({...action}).toEqual({type: PeopleActionTypes.UpdatePerson, payload});
  });
});
