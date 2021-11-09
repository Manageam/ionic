import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'intro',
    loadChildren: () =>
      import('../../pages/auth/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'signin',
    loadChildren: () =>
      import('../../pages/auth/signin/signin.module').then(
        (m) => m.SigninPageModule
      ),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('../../pages/auth/signup/signup.module').then(
        (m) => m.SignupPageModule
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'intro',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
