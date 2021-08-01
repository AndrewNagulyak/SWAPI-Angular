import {MovieModel} from '../../../shared/models/movie.model';
import {moviesReducer, MoviesState} from './movies.reducer';
import {GetMoviesSuccessAction, GetMovieSuccessAction, MoviesActionTypes} from './movies.actions';


let MOCK_DATA: MovieModel[];
const pagParams = {page: 1, limit: 2};
let state: MoviesState;
beforeAll(() => {
  state = {
    data: [],
    action: null
  };
  MOCK_DATA = [
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
});

describe('Load all Movies REDUCER', () => {
  it('should reduce the action GetMoviesSuccess', () => {
    const payload = {
      results: [...MOCK_DATA], count: MOCK_DATA.length, page: 1
    };
    const action = new GetMoviesSuccessAction(payload);
    const newState = moviesReducer(state, action);
    expect({...newState}).toEqual({
      ...state,
      data: payload.results,
      action: MoviesActionTypes.GetMoviesSuccess,
    });
    state = newState;
  });
});

describe('GET Movie by id REDUCER', () => {

  it('should reduce the action GetMovieSuccess', () => {
    const payload = MOCK_DATA[0];
    const action = new GetMovieSuccessAction({movie: payload});
    const data = state.data;
    state.data[0] = payload;
    const newState = moviesReducer(state, action);
    expect({...newState}).toEqual({
      ...state,
      data
    });
    state = newState;
  });
});
