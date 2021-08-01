import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToStarWarsYearsPipe} from './pipe/to-star-wars-years.pipe';


const declarations = [ToStarWarsYearsPipe];

@NgModule({
  declarations,
  exports: declarations,
  imports: [
    CommonModule,
  ],
  entryComponents: []
})
export class SharedModule {
}
