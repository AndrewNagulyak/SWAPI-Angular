import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getPerson, selectAllPeoplePage} from '../store/people/people.selectors';
import {filter, first, tap} from 'rxjs/operators';
import {ChangePeopleFilterAction, GetPeopleAction, GetPersonAction, PageChangeAction} from '../store/people/people.actions';
import {AppState} from '../../reducers';
import {combineLatest, forkJoin, Observable} from 'rxjs';
import {PersonModel} from '../../shared/models/person.model';
import {PaginationWrapper} from '../../shared/models/pagination-wrapper';
import {FilterModel} from '../../shared/models/filter.model';
import {selectMovieCharacters} from '../store/movies/movies.selectors';
import {selectSpeciesCharacters} from '../store/species/species.selectors';
import {getIdFromUrl} from '../../shared/helpers/getIdFromUrl';
import {starWardsDateTranform} from '../../shared/helpers/starWardsDateTranform';
import {isInitFilterState} from '../../shared/helpers/isNotInitFilterState';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  page = 1;

  constructor(private store: Store<AppState>) {
  }

  initPeople(): void {
    this.store.dispatch(new PageChangeAction({page: this.page}));
  }

  changePeopleFilter(filterModel: FilterModel): void {
    combineLatest([
      this.store.pipe(select(selectMovieCharacters(filterModel.selectedMovie))),
      this.store.pipe(select(selectSpeciesCharacters(filterModel.selectedSpecie))),
    ])
    .pipe(tap(([movieCharacters, speciesCharacters]) => {

      const filterData = !isInitFilterState(filterModel) ? this.getFilteredPersons(movieCharacters, speciesCharacters, filterModel) : [];
      const requestArray = [];
      filterData.map((person) => {
        requestArray.push(this.getById(person));
      });
      if (requestArray.length) {
        forkJoin(requestArray).subscribe((data: PersonModel[]) => {
          data = data.length
            ? this.filterPersonsByDate(data, filterModel) : [];
          this.store.dispatch(new ChangePeopleFilterAction({filterModel, filterData: data}));
        });
      } else {
        this.store.dispatch(new ChangePeopleFilterAction({filterModel, filterData: []}));

      }
    })).subscribe();

  }

  filterPersonsByDate(data, filterModel): PersonModel[] {
    if ((filterModel.selectedDateRange[0] !== -400 || filterModel.selectedDateRange[1] !== 400)) {
      return data.filter(person =>
        (+starWardsDateTranform(person.birth_year, 'from') > +filterModel.selectedDateRange[0] &&
          +starWardsDateTranform(person.birth_year, 'from') < +filterModel.selectedDateRange[1]));
    } else {
      return data;
    }
  }

  getFilteredPersons(movieCharacters, speciesCharacters, filterData: FilterModel): string[] {
    if (filterData.selectedSpecie === '-1') {
      return movieCharacters.map((person) => getIdFromUrl(person, 'people'));
    }
    if (filterData.selectedMovie === '-1') {
      return speciesCharacters.map((person) => getIdFromUrl(person, 'people'));
    } else {
      const people = movieCharacters.filter(item => speciesCharacters.includes(item));
      return people ? people.map((person) => getIdFromUrl(person, 'people')) : [];
    }
  }

  getAllPeopleByPage(pageSize): Observable<PaginationWrapper<PersonModel>> {
    // init people
    // observable with pagination
    return this.store.pipe(select(selectAllPeoplePage({
      page: this.page,
      limit: pageSize
    })), tap(people => {
      if (people && people.count === null) {
        this.store.dispatch(new GetPeopleAction({
            pagParams: {
              page: this.page,
              limit: pageSize,
            }
          }
        ));
      }
    }), filter(people => !!people));
  }

  changePage(page): void {
    this.page = page;
    this.store.dispatch(new PageChangeAction({
        page
      }
    ));
  }

  getById(personId): Observable<PersonModel> {
    return this.store.pipe(select(getPerson(personId)), tap(person => {
      if (!person) {
        this.store.dispatch(new GetPersonAction(personId));
      }
    }), filter(person => !!person), first());
  }

}
