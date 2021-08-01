import {HeaderComponent} from './header/header.component';
import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {throwIfAlreadyLoaded} from './module-import-guard';

import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {AppGuard} from './guards/app.guard';
import {DarkSideGuard} from './guards/dark-side.guard';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [
    HeaderComponent
  ],
  providers: [
    DarkSideGuard,
    AppGuard
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}

// one instance per application
