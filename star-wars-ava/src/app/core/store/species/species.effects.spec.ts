import {Actions} from '@ngrx/effects';
import {addMatchers, cold, initTestScheduler} from 'jasmine-marbles';
import {TestBed} from '@angular/core/testing';
import {of, throwError} from 'rxjs';

import {PaginationWrapper} from '../../../shared/models/pagination-wrapper';
import {SpecieModel} from '../../../shared/models/specie.model';
import {SpeciesEffects} from './species.effects';
import {
  GetSpeciesErrorAction,
  GetSpeciesListErrorAction,
  GetSpeciesListSuccessAction,
  GetSpeciesSuccessAction,
  SpeciesActionTypes
} from './species.actions';

beforeEach(() => {
  initTestScheduler();
  addMatchers();
});

const MOCK_DATA: SpecieModel[] = [
  {
    url: '1',
    name: 'Species 1',
    people: ['1', '2']
  }, {
    url: '2',
    name: 'Species 2',
    people: ['2', '3']
  }
];
const pagParams = {page: 1, limit: 10};
const moqWrapper: PaginationWrapper<SpecieModel> = {
  results: [...MOCK_DATA], count: MOCK_DATA.length, page: pagParams.page
};

describe('SpeciesListEffects', () => {
  let service: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SpeciesEffects
      ]
    });
    service = jasmine.createSpyObj('specService', ['getAll', 'getById']);
  });

  describe('getAllSpeciesList$', () => {
    it('should return a SpeciesListSuccess action, with the people, on success', () => {
      service.getAll.and.returnValue(of(moqWrapper));
      const source = cold('a', {a: {type: SpeciesActionTypes.GetSpeciesList}});
      const effects = new SpeciesEffects(new Actions(source), service);
      const expected = cold('a', {a: new GetSpeciesListSuccessAction(moqWrapper)});
      expect(effects.getListSpecies$).toBeObservable(expected);
    });

    it('should return a GetSpeciesListError action, with the error', () => {
      const error = new Error('Error loading movies');
      service.getAll.and.returnValue(throwError(error));

      const source = cold('a', {a: {type: SpeciesActionTypes.GetSpeciesList}});
      const effects = new SpeciesEffects(new Actions(source), service);

      effects.getListSpecies$.subscribe(result => {
        expect(result).toEqual(new GetSpeciesListErrorAction(error));
      });
    });
  });

  describe('getSpecies$', () => {
    it('should return a GetSpeciesSuccess action, with the person found, on success', () => {
      const data = MOCK_DATA[0];
      service.getById.and.returnValue(of(data));
      const source = cold('a', {a: {type: SpeciesActionTypes.GetSpecies, payload: {id: data.url}}});
      const effects = new SpeciesEffects(new Actions(source), service);
      const expected = cold('a', {a: new GetSpeciesSuccessAction(data)});

      expect(effects.getSpecie$).toBeObservable(expected);
    });

    it('should return a GetSpeciesError action, with the error', () => {
      const data = MOCK_DATA[0];
      const error = new Error(`Error loading the person with id ${data.url}`);
      service.getById.and.returnValue(throwError(error));

      const source = cold('a', {a: {type: SpeciesActionTypes.GetSpecies, payload: {id: data.url}}});
      const effects = new SpeciesEffects(new Actions(source), service);

      effects.getSpecie$.subscribe(result => {
        expect(result).toEqual(new GetSpeciesErrorAction(error));
      });
    });
  });
});

