import {StarshipModel} from '../../../shared/models/starship.model';
import {StarshipsActions, StarshipsActionTypes} from './starships.actions';


export const boardsFeatureKey = 'starships';

export interface StarshipState {
  data: StarshipModel[];
  action: string;
}

export const initialState: StarshipState = {
  data: [],
  action: null,
};

export function starshipsReducer(state = initialState, action: StarshipsActions): StarshipState {
  switch (action.type) {

    case StarshipsActionTypes.GetStarshipSuccess :
      const replaceStarshipIndex = state.data.findIndex((starship: StarshipModel) => starship.url === action.payload.url);
      let newData;
      if (replaceStarshipIndex > -1) {
        newData = [...state.data];
        newData[replaceStarshipIndex] = action.payload;
      } else {
        newData = [...state.data, action.payload];
      }
      return {
        ...state,
        data: newData,
        action: StarshipsActionTypes.GetStarship,
      };
    default:
      return state;
  }

}
