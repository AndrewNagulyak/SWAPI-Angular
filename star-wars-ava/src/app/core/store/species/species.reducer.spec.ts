import {speciesReducer, SpeciesState} from './species.reducer';
import {SpecieModel} from '../../../shared/models/specie.model';
import {GetSpeciesListSuccessAction, GetSpeciesSuccessAction, SpeciesActionTypes} from './species.actions';


let MOCK_DATA: SpecieModel[];
const pagParams = {page: 1, limit: 2};
let state: SpeciesState;
beforeAll(() => {
  state = {
    data: [],
    action: null
  };
  MOCK_DATA = [
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
});

describe('Load all SpeciesList REDUCER', () => {
  it('should reduce the action GetSpeciesListSuccess', () => {
    const payload = {
      results: [...MOCK_DATA], count: MOCK_DATA.length, page: 1,
    };
    const action = new GetSpeciesListSuccessAction(payload);
    const newState = speciesReducer(state, action);
    expect({...newState}).toEqual({
      ...state,
      data: payload.results,
      action: SpeciesActionTypes.GetSpeciesListSuccess,
    });
    state = newState;
  });
});

describe('GET Species by id REDUCER', () => {

  it('should reduce the action GetSpeciesSuccess', () => {
    const payload = MOCK_DATA[0];
    const action = new GetSpeciesSuccessAction( payload);
    const data = state.data;
    state.data[0] = payload;
    const newState = speciesReducer(state, action);
    expect({...newState}).toEqual({
      ...state,
      data
    });
    state = newState;
  });
});
