import {Actions} from '@ngrx/effects';
import {addMatchers, cold, initTestScheduler} from 'jasmine-marbles';
import {MovieModel} from '../../../shared/models/movie.model';
import {TestBed} from '@angular/core/testing';
import {MoviesEffects} from './movies.effects';
import {of, throwError} from 'rxjs';
import {
  GetMovieErrorAction,
  GetMoviesErrorAction,
  GetMoviesSuccessAction,
  GetMovieSuccessAction,
  MoviesActionTypes
} from './movies.actions';
import {PaginationWrapper} from '../../../shared/models/pagination-wrapper';

beforeEach(() => {
  initTestScheduler();
  addMatchers();
});

const MOCK_DATA: MovieModel[] = [
  {
    url: '1',
    title: 'Movie 1',
    characters: ['1', '2']
  }, {
    url: '2',
    title: 'Movie 2',
    characters: ['2', '3']
  }
];
const pagParams = {page: 1, limit: 10};
const moqWrapper: PaginationWrapper<MovieModel> = {
   results: [...MOCK_DATA], count: MOCK_DATA.length, page: pagParams.page
};

describe('MoviesEffects', () => {
  let service: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MoviesEffects
      ]
    });
    service = jasmine.createSpyObj('moviesService', ['getAll', 'getById']);
  });

  describe('getAllMovies$', () => {
    it('should return a MoviesSuccess action, with the people, on success', () => {
      service.getAll.and.returnValue(of(moqWrapper));
      const source = cold('a', {a: {type: MoviesActionTypes.GetMovies}});
      const effects = new MoviesEffects(new Actions(source), service);
      const expected = cold('a', {a: new GetMoviesSuccessAction(moqWrapper)});
      expect(effects.getAllMovies$).toBeObservable(expected);
    });

    it('should return a GetMoviesError action, with the error', () => {
      const error = new Error('Error loading movies');
      service.getAll.and.returnValue(throwError(error));

      const source = cold('a', {a: {type: MoviesActionTypes.GetMovies}});
      const effects = new MoviesEffects(new Actions(source), service);

      effects.getAllMovies$.subscribe(result => {
        expect(result).toEqual(new GetMoviesErrorAction(error));
      });
    });
  });

  describe('getMovie$', () => {
    it('should return a GetMovieSuccess action, with the person found, on success', () => {
      const data = MOCK_DATA[0];
      service.getById.and.returnValue(of(data));
      const source = cold('a', {a: {type: MoviesActionTypes.GetMovie, payload: {id: data.url}}});
      const effects = new MoviesEffects(new Actions(source), service);
      const expected = cold('a', {a: new GetMovieSuccessAction({movie: data})});

      expect(effects.getMovie$).toBeObservable(expected);
    });

    it('should return a GetMovieError action, with the error', () => {
      const data = MOCK_DATA[0];
      const error = new Error(`Error loading the person with id ${data.url}`);
      service.getById.and.returnValue(throwError(error));

      const source = cold('a', {a: {type: MoviesActionTypes.GetMovie, payload: {id: data.url}}});
      const effects = new MoviesEffects(new Actions(source), service);

      effects.getMovie$.subscribe(result => {
        expect(result).toEqual(new GetMovieErrorAction(error));
      });
    });
  });
});

