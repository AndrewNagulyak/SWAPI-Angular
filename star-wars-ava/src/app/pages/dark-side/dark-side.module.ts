import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DarkSideComponent } from './dark-side/dark-side.component';
import {DarkSideRoutingModule} from './dark-side-routing.module';



@NgModule({
  declarations: [DarkSideComponent],
  imports: [
    CommonModule,
    DarkSideRoutingModule
  ]
})
export class DarkSideModule { }
