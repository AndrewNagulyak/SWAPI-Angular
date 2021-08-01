import {createFeatureSelector, createSelector} from '@ngrx/store';
import {StarshipState} from './starships.reducer';

export const getstarshipState = createFeatureSelector<StarshipState>('starships');

export const getAllstarship = createSelector(getstarshipState, (state: StarshipState) => state);
export const getstarshipById = (id: string) =>
  createSelector(getstarshipState, state => {
    const foundPerson = state.data.find(spc => spc.url === id);
    return foundPerson ? foundPerson : null;
  });
