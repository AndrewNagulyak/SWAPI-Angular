import {FilterModel} from '../../../shared/models/filter.model';
import {PersonModel} from '../../../shared/models/person.model';
import {TestBed} from '@angular/core/testing';
import {PeopleEffects} from './people.effects';
import {of, throwError} from 'rxjs';
import {
  GetPeopleErrorAction,
  GetPeopleSuccessAction,
  GetPersonErrorAction,
  GetPersonSuccessAction,
  PeopleActionTypes
} from './people.actions';
import {Actions} from '@ngrx/effects';
import {addMatchers, cold, initTestScheduler} from 'jasmine-marbles';

beforeEach(() => {
  initTestScheduler();
  addMatchers();
});

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

const pagParams = {page: 1, limit: 10};
const moqWrapper = {
  people: {results: [...MOCK_DATA], count: MOCK_DATA.length, page: pagParams.page},
  pagParams
};

describe('People Effects', () => {
  let service: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PeopleEffects
      ]
    });
    service = jasmine.createSpyObj('peopleService', ['getAll', 'getById']);
  });

  describe('getAllPeople$', () => {
    it('should return a GetPeopleSuccess action, with the people, on success', () => {
      service.getAll.and.returnValue(of({...moqWrapper, pagParams}));
      const source = cold('a', {a: {type: PeopleActionTypes.GetPeople, payload: pagParams}});
      const effects = new PeopleEffects(new Actions(source), service);
      const expected = cold('a', {a: new GetPeopleSuccessAction(moqWrapper)});
      expect(effects.getAllPeople$).toBeObservable(expected);
    });

    it('should return a GetPeopleError action, with the error', () => {
      const error = new Error('Error loading peoples');
      service.getAll.and.returnValue(throwError(error));

      const source = cold('a', {a: {type: PeopleActionTypes.GetPeople, payload: pagParams}});
      const effects = new PeopleEffects(new Actions(source), service);

      effects.getAllPeople$.subscribe(result => {
        expect(result).toEqual(new GetPeopleErrorAction(error));
      });
    });
  });

  describe('getPerson$', () => {
    it('should return a GetPersonSuccess action, with the person found, on success', () => {
      const data = MOCK_DATA[0];
      service.getById.and.returnValue(of(data));
      const source = cold('a', {a: {type: PeopleActionTypes.GetPerson}});
      const effects = new PeopleEffects(new Actions(source), service);
      const expected = cold('a', {a: new GetPersonSuccessAction(data)});

      expect(effects.getPerson$).toBeObservable(expected);
    });

    it('should return a GetPersonError action, with the error', () => {
      const data = MOCK_DATA[0];
      const error = new Error(`Error loading the person with id ${data.url}`);
      service.getById.and.returnValue(throwError(error));

      const source = cold('a', {a: {type: PeopleActionTypes.GetPerson}});
      const effects = new PeopleEffects(new Actions(source), service);

      effects.getPerson$.subscribe(result => {
        expect(result).toEqual(new GetPersonErrorAction(error));
      });
    });
  });

});

