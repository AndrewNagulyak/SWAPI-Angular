import {Actions} from '@ngrx/effects';
import {addMatchers, cold, initTestScheduler} from 'jasmine-marbles';
import {TestBed} from '@angular/core/testing';
import {of, throwError} from 'rxjs';
import {StarshipModel} from '../../../shared/models/starship.model';
import {StarshipsEffects} from './starships.effects';
import {GetStarshipErrorAction, GetStarshipSuccessAction, StarshipsActionTypes} from './starships.actions';


beforeEach(() => {
  initTestScheduler();
  addMatchers();
});

const MOCK_DATA: StarshipModel[] = [
  {
    url: '1',
    name: 'Starship 1',
  }, {
    url: '2',
    name: 'Starship 2',
  }
];

describe('Starship Effects', () => {
  let service: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StarshipsEffects
      ]
    });
    service = jasmine.createSpyObj('starShipService', ['getAll', 'getById']);
  });
  describe('getStarship$', () => {
    it('should return a GetStarshipSuccess action, with the person found, on success', () => {
      const data = MOCK_DATA[0];
      service.getById.and.returnValue(of(data));
      const source = cold('a', {a: {type: StarshipsActionTypes.GetStarship, payload: {id: data.url}}});
      const effects = new StarshipsEffects(new Actions(source), service);
      const expected = cold('a', {a: new GetStarshipSuccessAction(data)});

      expect(effects.getStarship$).toBeObservable(expected);
    });

    it('should return a GetStarshipError action, with the error', () => {
      const data = MOCK_DATA[0];
      const error = new Error(`Error loading the person with id ${data.url}`);
      service.getById.and.returnValue(throwError(error));

      const source = cold('a', {a: {type: StarshipsActionTypes.GetStarship, payload: {id: data.url}}});
      const effects = new StarshipsEffects(new Actions(source), service);

      effects.getStarship$.subscribe(result => {
        expect(result).toEqual(new GetStarshipErrorAction(error));
      });
    });
  });
});

