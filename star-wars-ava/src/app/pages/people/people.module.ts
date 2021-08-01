import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PeopleListComponent} from './components/people-list/people-list.component';
import {PeoplesRoutingModule} from './peoples.routing-module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {peopleReducer} from '../../core/store/people/people.reducer';
import {PeopleEffects} from '../../core/store/people/people.effects';
import {PersonDetailsComponent} from './components/person-detail/person-details.component';
import { PeoplePageComponent } from './components/people-page/people-page.component';
import {DropDownListModule} from '@progress/kendo-angular-dropdowns';
import {GridModule} from '@progress/kendo-angular-grid';
import {RangeSliderModule} from '@progress/kendo-angular-inputs';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [PeopleListComponent, PersonDetailsComponent, PeoplePageComponent],
  imports: [
    CommonModule,
    PeoplesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('people', peopleReducer),
    EffectsModule.forFeature([PeopleEffects]),
    DropDownListModule,
    SharedModule,
    GridModule,
    RangeSliderModule,
    SharedModule
  ]
})
export class PeopleModule {
}
