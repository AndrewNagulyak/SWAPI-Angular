import {SpecieModel} from '../../../shared/models/specie.model';
import {SpeciesActions, SpeciesActionTypes} from './species.actions';


export const boardsFeatureKey = 'species';

export interface SpeciesState {
  data: SpecieModel[];
  action: string;
}

export const initialState: SpeciesState = {
  data: [],
  action: null,
};

export function speciesReducer(state = initialState, action: SpeciesActions): SpeciesState {
  switch (action.type) {

    case SpeciesActionTypes.GetSpeciesSuccess :
      const replaceSpeciesIndex = state.data.findIndex((person: SpecieModel) => person.url === action.payload.url);
      let newData;
      if (replaceSpeciesIndex > -1) {
        newData = [...state.data];
        newData[replaceSpeciesIndex] = action.payload;
      } else {
        newData = [...state.data, action.payload];
      }
      return {
        ...state,
        data: newData,
      };
    case SpeciesActionTypes.GetSpeciesListSuccess :
      return {
        ...state,
        action: SpeciesActionTypes.GetSpeciesListSuccess,
        data: action.payload.results
      };


    default:
      return state;
  }

}
