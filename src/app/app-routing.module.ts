import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { GuestService } from './services/guest/guest.service';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
    canActivate: [GuestService],
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/logged/logged.module').then((m) => m.LoggedModule),
    canActivate: [AuthService],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/auth',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
