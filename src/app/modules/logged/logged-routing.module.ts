import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/layouts/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../../pages/logged/home/home.module').then(
            (m) => m.HomePageModule
          ),
      },
      {
        path: 'education',
        loadChildren: () =>
          import('../../pages/logged/education/education.module').then(
            (m) => m.EducationPageModule
          ),
      },
      {
        path: 'health',
        loadChildren: () =>
          import('../../pages/logged/health/health.module').then(
            (m) => m.HealthPageModule
          ),
      },
      {
        path: 'reminder',
        loadChildren: () =>
          import('../../pages/logged/reminder/reminder.module').then(
            (m) => m.ReminderPageModule
          ),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoggedRoutingModule {}
