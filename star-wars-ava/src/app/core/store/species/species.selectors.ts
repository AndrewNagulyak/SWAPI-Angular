import {createFeatureSelector, createSelector} from '@ngrx/store';
import {SpeciesState} from './species.reducer';
import {SpecieModel} from '../../../shared/models/specie.model';

export const getSpeciesState = createFeatureSelector<SpeciesState>('species');

export const getAllSpecies = createSelector(getSpeciesState, (state: SpeciesState) => state);
export const getSpeciesById = (id) =>
  createSelector(getSpeciesState, state => {
    const foundPerson = state.data.find(spc => spc.url === id);
    return foundPerson ? foundPerson : null;
  });

export const selectAllSpecies = createSelector(getSpeciesState, (state: SpeciesState) => state.data);
export const selectSpeciesCharacters = (id) => createSelector(getSpeciesById(id), (state: SpecieModel) => state ? state.people : []);
