import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GaugeModule } from 'angular-gauge';
import { SharedModule } from './modules/shared/shared.module';
import { AuthenticationService } from './services/authentication/authentication.service';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthService } from './services/auth/auth.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    SharedModule,
    BrowserModule,
    GaugeModule.forRoot(),
    IonicModule.forRoot(),
    JwtModule.forRoot({
      config: {},
    }),
    AppRoutingModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthenticationService,
    AuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
