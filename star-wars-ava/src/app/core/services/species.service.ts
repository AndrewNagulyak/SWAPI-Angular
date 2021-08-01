import {Injectable} from '@angular/core';
import {AppState} from '../../reducers';
import {select, Store} from '@ngrx/store';
import {filter, map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {SpecieModel} from '../../shared/models/specie.model';
import {GetSpeciesListAction} from '../store/species/species.actions';
import {getSpeciesState} from '../store/species/species.selectors';

@Injectable({
  providedIn: 'root'
})
export class SpeciesService {

  constructor(private store: Store<AppState>) {

  }

  getAllSpecies(): Observable<SpecieModel[]> {
    return this.store.pipe(select(getSpeciesState), tap(specieState => {
      // init people
      if (!specieState.action) {
        this.store.dispatch(new GetSpeciesListAction());
      }
    }), map(movieState => movieState.data), filter(movies => movies !== null));
  }
}
