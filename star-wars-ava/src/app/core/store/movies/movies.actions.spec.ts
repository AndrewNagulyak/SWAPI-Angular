import {MovieModel} from '../../../shared/models/movie.model';
import {
  GetMovieAction,
  GetMovieErrorAction,
  GetMoviesAction,
  GetMoviesErrorAction,
  GetMoviesSuccessAction,
  GetMovieSuccessAction,
  MoviesActionTypes
} from './movies.actions';

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
/****************************************
 * GET all Movies
 ****************************************/
describe('Load All Movies ACTION', () => {
  it('should create the action Get Movies', () => {
    const action = new GetMoviesAction();
    expect({...action}).toEqual({type: MoviesActionTypes.GetMovies});
  });
  it('should create the action GetMoviesSuccess', () => {
    const payload = {
     results: [...MOCK_DATA], count: MOCK_DATA.length, page: 1
    };
    const action = new GetMoviesSuccessAction(payload);
    expect({...action}).toEqual({type: MoviesActionTypes.GetMoviesSuccess, payload});
  });
  it('should create the action Get Movies Errors', () => {
    const payload = new Error('Error loading movies');
    const action = new GetMoviesErrorAction(payload);
    expect({...action}).toEqual({
      type: MoviesActionTypes.GetMoviesError, payload
    });
  });
});
/****************************************
 * GET Movie
 ****************************************/
describe('Load specific Movie ACTION', () => {
  it('should create the action GetMovie', () => {
    const payload = {id: MOCK_DATA[0].url};
    const action = new GetMovieAction(payload);
    expect({...action}).toEqual({type: MoviesActionTypes.GetMovie, payload});
  });
  it('should create the action GetMovieSucces', () => {
    const payload = {movie: MOCK_DATA[0]};
    const action = new GetMovieSuccessAction(payload);
    expect({...action}).toEqual({type: MoviesActionTypes.GetMovieSuccess, payload});
  });
  it('should create the action GetMovieError', () => {
    const payload = new Error('Error loading the movie');
    const action = new GetMovieErrorAction(payload);
    expect({...action}).toEqual({
      type: MoviesActionTypes.GetMovieError, payload
    });
  });
});
