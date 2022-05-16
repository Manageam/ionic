import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'ion2-calendar';
import { UpdateBloodPressureComponent } from 'src/app/modals/update-blood-pressure/update-blood-pressure.component';
import { UpdateBloodSugarComponent } from 'src/app/modals/update-blood-sugar/update-blood-sugar.component';
import { UpdateBmiComponent } from 'src/app/modals/update-bmi/update-bmi.component';
import { UpdateCholesterolComponent } from 'src/app/modals/update-cholesterol/update-cholesterol.component';
import { UpdateHba1cComponent } from 'src/app/modals/update-hba1c/update-hba1c.component';
import { UpdateHealthStatusComponent } from 'src/app/modals/update-health-status/update-health-status.component';
import { ViewBloodPressureComponent } from 'src/app/modals/view-blood-pressure/view-blood-pressure.component';
import { ViewBloodSugarComponent } from 'src/app/modals/view-blood-sugar/view-blood-sugar.component';
import { ViewBmiComponent } from 'src/app/modals/view-bmi/view-bmi.component';
import { ViewCholesterolComponent } from 'src/app/modals/view-cholesterol/view-cholesterol.component';
import { ViewHba1cComponent } from 'src/app/modals/view-hba1c/view-hba1c.component';
import { AddMedicationComponent } from 'src/app/modals/add-medication/add-medication.component';
import { AllMedicationsComponent } from 'src/app/modals/all-medications/all-medications.component';
import { AddReminderComponent } from 'src/app/modals/add-reminder/add-reminder.component';
import { RegisterForWalkComponent } from 'src/app/modals/register-for-walk/register-for-walk.component';
import { SettingsComponent } from 'src/app/modals/settings/settings.component';
import { MealsListComponent } from 'src/app/modals/meals-list/meals-list.component';
import { SearchComponent } from 'src/app/modals/search/search.component';
import { TermsComponent } from 'src/app/modals/terms/terms.component';
import { ShareEmailComponent } from 'src/app/modals/share-email/share-email.component';
import { AddMealComponent } from 'src/app/modals/add-meal/add-meal.component';
import { ViewMealComponent } from 'src/app/modals/view-meal/view-meal.component';
import { ViewHealthStatusComponent } from 'src/app/modals/view-health-status/view-health-status.component';
import { ForgotPasswordComponent } from 'src/app/modals/forgot-password/forgot-password.component';
import { CalendarModalComponent } from 'src/app/modals/calendar-modal/calendar-modal.component';
import { LanguageSettingsComponent } from 'src/app/modals/language-settings/language-settings.component';
import { BookmarksComponent } from 'src/app/modals/bookmarks/bookmarks.component';
import { BookmarkComponent } from 'src/app/modals/bookmark/bookmark.component';
import { ComponentsModule } from '../components/components.module';
import { ExerciseComponent } from 'src/app/modals/exercise/exercise.component';
import { ViewMealsComponent } from 'src/app/modals/view-meals/view-meals.component';
import { DiabetesWalkComponent } from 'src/app/modals/diabetes-walk/diabetes-walk.component';
import { HealthProfileComponent } from 'src/app/pages/auth/signup/health-profile/health-profile.component';

@NgModule({
  declarations: [
    UpdateBloodPressureComponent,
    UpdateBloodSugarComponent,
    UpdateBmiComponent,
    UpdateCholesterolComponent,
    UpdateHba1cComponent,
    UpdateHealthStatusComponent,
    ViewBloodPressureComponent,
    ViewBloodSugarComponent,
    ViewBmiComponent,
    ViewCholesterolComponent,
    ViewHba1cComponent,
    AddMedicationComponent,
    AllMedicationsComponent,
    AddReminderComponent,
    RegisterForWalkComponent,
    SettingsComponent,
    MealsListComponent,
    SearchComponent,
    TermsComponent,
    ShareEmailComponent,
    AddMealComponent,
    ViewHealthStatusComponent,
    ViewMealComponent,
    ViewMealsComponent,
    ForgotPasswordComponent,
    CalendarModalComponent,
    LanguageSettingsComponent,
    BookmarksComponent,
    BookmarkComponent,
    ExerciseComponent,
    DiabetesWalkComponent,
    HealthProfileComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ComponentsModule,
    CalendarModule.forRoot({
      doneLabel: 'Save',
      closeIcon: true,
    }),
  ],
})
export class ModalsModule {}
