import {SpecieModel} from '../../../shared/models/specie.model';
import {
  GetSpeciesAction,
  GetSpeciesErrorAction,
  GetSpeciesListAction,
  GetSpeciesListErrorAction,
  GetSpeciesListSuccessAction,
  GetSpeciesSuccessAction,
  SpeciesActionTypes
} from './species.actions';

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
/****************************************
 * GET all SpeciesList
 ****************************************/
describe('Load All SpeciesList ACTION', () => {
  it('should create the action Get SpeciesList', () => {
    const action = new GetSpeciesListAction();
    expect({...action}).toEqual({type: SpeciesActionTypes.GetSpeciesList});
  });
  it('should create the action GetSpeciesListSuccess', () => {
    const payload = {
      results: [...MOCK_DATA], count: MOCK_DATA.length, page: 1
    };
    const action = new GetSpeciesListSuccessAction(payload);
    expect({...action}).toEqual({type: SpeciesActionTypes.GetSpeciesListSuccess, payload});
  });
  it('should create the action Get SpeciesList Errors', () => {
    const payload = new Error('Error loading speciesList');
    const action = new GetSpeciesListErrorAction(payload);
    expect({...action}).toEqual({
      type: SpeciesActionTypes.GetSpeciesListError, payload
    });
  });
});
/****************************************
 * GET Species
 ****************************************/
describe('Load specific Species ACTION', () => {
  it('should create the action GetSpecies', () => {
    const payload = MOCK_DATA[0].url;
    const action = new GetSpeciesAction(payload);
    expect({...action}).toEqual({type: SpeciesActionTypes.GetSpecies, payload});
  });
  it('should create the action GetSpeciesSucces', () => {
    const payload = MOCK_DATA[0];
    const action = new GetSpeciesSuccessAction(payload);
    expect({...action}).toEqual({type: SpeciesActionTypes.GetSpeciesSuccess, payload});
  });
  it('should create the action GetSpeciesError', () => {
    const payload = new Error('Error loading the species');
    const action = new GetSpeciesErrorAction(payload);
    expect({...action}).toEqual({
      type: SpeciesActionTypes.GetSpeciesError, payload
    });
  });
});
