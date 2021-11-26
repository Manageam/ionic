import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { BloodSugarComponent } from 'src/app/components/blood-sugar/blood-sugar.component';
import { BloodPressureComponent } from 'src/app/components/blood-pressure/blood-pressure.component';
import { BmiComponent } from 'src/app/components/bmi/bmi.component';
import { CholesterolComponent } from 'src/app/components/cholesterol/cholesterol.component';
import { ExerciseComponent } from 'src/app/components/exercise/exercise.component';
import { Hba1cComponent } from 'src/app/components/hba1c/hba1c.component';
import { AddMealComponent } from 'src/app/components/add-meal/add-meal.component';
import { AddMedicationComponent } from 'src/app/components/add-medication/add-medication.component';
import { AllMedicationsComponent } from 'src/app/components/all-medications/all-medications.component';
import { GuageComponent } from 'src/app/components/guage/guage.component';
import { HealthStatusComponent } from 'src/app/components/health-status/health-status.component';
import { UpdateBloodPressureComponent } from 'src/app/components/update-blood-pressure/update-blood-pressure.component';
import { UpdateBloodSugarComponent } from 'src/app/components/update-blood-sugar/update-blood-sugar.component';
import { UpdateBmiComponent } from 'src/app/components/update-bmi/update-bmi.component';
import { UpdateCholesterolComponent } from 'src/app/components/update-cholesterol/update-cholesterol.component';
import { UpdateHba1cComponent } from 'src/app/components/update-hba1c/update-hba1c.component';
import { UpdateHealthStatusComponent } from 'src/app/components/update-health-status/update-health-status.component';
import { ViewBloodPressureComponent } from 'src/app/components/view-blood-pressure/view-blood-pressure.component';
import { ViewBloodSugarComponent } from 'src/app/components/view-blood-sugar/view-blood-sugar.component';
import { ViewBmiComponent } from 'src/app/components/view-bmi/view-bmi.component';
import { ViewCholesterolComponent } from 'src/app/components/view-cholesterol/view-cholesterol.component';
import { ViewHba1cComponent } from 'src/app/components/view-hba1c/view-hba1c.component';
import { ViewHealthStatusComponent } from 'src/app/components/view-health-status/view-health-status.component';
import { ViewMealComponent } from 'src/app/components/view-meal/view-meal.component';
import { HomePage } from 'src/app/pages/logged/home/home.page';
import { HealthPage } from 'src/app/pages/logged/health/health.page';
import { ExpandableComponent } from 'src/app/components/expandable/expandable.component';
import { FormsModule } from '@angular/forms';
import { ReminderComponent } from 'src/app/components/reminder/reminder.component';
import { AddReminderComponent } from 'src/app/components/add-reminder/add-reminder.component';
import { BookmarksComponent } from 'src/app/components/bookmarks/bookmarks.component';
import { BookmarkComponent } from 'src/app/components/bookmark/bookmark.component';
import { DiabetesWalkComponent } from 'src/app/components/diabetes-walk/diabetes-walk.component';
import { RegisterForWalkComponent } from 'src/app/components/register-for-walk/register-for-walk.component';
import { SettingsComponent } from 'src/app/components/settings/settings.component';
import { LanguageSettingsComponent } from 'src/app/components/language-settings/language-settings.component';
import { ViewMealsComponent } from 'src/app/components/view-meals/view-meals.component';
import { MealsListComponent } from 'src/app/components/meals-list/meals-list.component';
import { HealthProfileComponent } from 'src/app/pages/auth/signup/health-profile/health-profile.component';

@NgModule({
  declarations: [
    BloodSugarComponent,
    BloodPressureComponent,
    BmiComponent,
    CholesterolComponent,
    ExerciseComponent,
    Hba1cComponent,
    AddMealComponent,
    AddMedicationComponent,
    AllMedicationsComponent,
    GuageComponent,
    HealthStatusComponent,
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
    ViewHealthStatusComponent,
    ViewMealComponent,
    HomePage,
    HealthPage,
    ExpandableComponent,
    ReminderComponent,
    AddReminderComponent,
    BookmarksComponent,
    BookmarkComponent,
    DiabetesWalkComponent,
    RegisterForWalkComponent,
    SettingsComponent,
    LanguageSettingsComponent,
    ViewMealsComponent,
    ViewMealComponent,
    MealsListComponent,
    HealthProfileComponent,
  ],
  imports: [CommonModule, IonicModule, FormsModule],
})
export class SharedModule {}
