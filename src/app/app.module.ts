import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GaugeModule } from 'angular-gauge';
import { AuthenticationService } from './services/authentication/authentication.service';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthService } from './services/auth/auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoaderInterceptor } from './interceptors/loader.interceptors';
import { LoggedModule } from './modules/logged/logged.module';
import { ComponentsModule } from './modules/shared/components/components.module';
import { ModalsModule } from './modules/shared/modals/modals.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    LoggedModule,
    ComponentsModule,
    ModalsModule,
    BrowserModule,
    GaugeModule.forRoot(),
    IonicModule.forRoot(),
    JwtModule.forRoot({
      config: {},
    }),
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthenticationService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
