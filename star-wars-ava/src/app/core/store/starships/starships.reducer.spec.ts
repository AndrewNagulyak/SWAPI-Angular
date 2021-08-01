import {StarshipModel} from '../../../shared/models/starship.model';
import {starshipsReducer, StarshipState} from './starships.reducer';
import {speciesReducer} from '../species/species.reducer';
import {GetStarshipSuccessAction, StarshipsActionTypes} from './starships.actions';

let MOCK_DATA: StarshipModel[];
const pagParams = {page: 1, limit: 2};
let state: StarshipState;
beforeAll(() => {
  state = {
    data: [],
    action: null
  };
  MOCK_DATA = [
    {
      url: '1',
      name: 'Starship 1',
    }, {
      url: '2',
      name: 'Starship 2',
    }
  ];
});

describe('GET Starship by id REDUCER', () => {

  it('should reduce the action GetStarshipSuccess', () => {
    const payload = MOCK_DATA[0];
    const action = new GetStarshipSuccessAction( payload);
    const data = state.data;
    state.data[0] = payload;
    const newState = starshipsReducer(state, action);
    expect({...newState}).toEqual({
      ...state,
      action: StarshipsActionTypes.GetStarship,
      data
    });
    state = newState;
  });
});
