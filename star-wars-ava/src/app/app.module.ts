import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {RouterStateSerializer, StoreRouterConnectingModule} from '@ngrx/router-store';
import {reducers} from './reducers';
import {DropDownsModule} from '@progress/kendo-angular-dropdowns';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MoviesEffects} from './core/store/movies/movies.effects';
import {SpeciesEffects} from './core/store/species/species.effects';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AppHttpInterceptor} from './core/interceptors/app-http.interceptor';
import {CustomSerializer} from './shared/models/custom-route-serializer';
import {StarshipsEffects} from './core/store/starships/starships.effects';
import {environment} from '../environments/environment';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {AppGuard} from './core/guards/app.guard';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true,
      }
    }),
    EffectsModule.forRoot([MoviesEffects, SpeciesEffects, StarshipsEffects]),
    StoreRouterConnectingModule.forRoot({stateKey: 'router'}),
    DropDownsModule,
    BrowserAnimationsModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],

  ],
  providers: [{provide: RouterStateSerializer, useClass: CustomSerializer},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
