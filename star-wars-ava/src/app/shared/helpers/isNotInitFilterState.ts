import {FilterModel} from '../models/filter.model';

export function isInitFilterState(filter: FilterModel): boolean {
  return filter.selectedMovie === '-1' && filter.selectedSpecie === '-1' && filter.selectedDateRange[0] === -400 && filter.selectedDateRange[1] === 400;

}
