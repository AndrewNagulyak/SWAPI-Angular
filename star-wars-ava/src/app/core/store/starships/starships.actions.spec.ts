import {StarshipModel} from '../../../shared/models/starship.model';
import {GetStarshipAction, GetStarshipErrorAction, GetStarshipSuccessAction, StarshipsActionTypes} from './starships.actions';

const MOCK_DATA: StarshipModel[] = [
  {
    url: '1',
    name: 'Starship 1',
  }, {
    url: '2',
    name: 'Starship 2',
  }
];
/****************************************
 * GET Starship
 ****************************************/
describe('Load specific Starship ACTION', () => {
  it('should create the action GetStarship', () => {
    const payload = MOCK_DATA[0].url;
    const action = new GetStarshipAction(payload);
    expect({...action}).toEqual({type: StarshipsActionTypes.GetStarship, payload});
  });
  it('should create the action GetStarshipSucces', () => {
    const payload = MOCK_DATA[0];
    const action = new GetStarshipSuccessAction(payload);
    expect({...action}).toEqual({type: StarshipsActionTypes.GetStarshipSuccess, payload});
  });
  it('should create the action GetStarshipError', () => {
    const payload = new Error('Error loading the starship');
    const action = new GetStarshipErrorAction(payload);
    expect({...action}).toEqual({
      type: StarshipsActionTypes.GetStarshipError, payload
    });
  });
});
