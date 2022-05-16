import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BloodSugarComponent } from 'src/app/components/blood-sugar/blood-sugar.component';
import { BloodPressureComponent } from 'src/app/components/blood-pressure/blood-pressure.component';
import { BmiComponent } from 'src/app/components/bmi/bmi.component';
import { CholesterolComponent } from 'src/app/components/cholesterol/cholesterol.component';
import { Hba1cComponent } from 'src/app/components/hba1c/hba1c.component';
import { GuageComponent } from 'src/app/components/guage/guage.component';
import { HealthStatusComponent } from 'src/app/components/health-status/health-status.component';
import { ExpandableComponent } from 'src/app/components/expandable/expandable.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    BloodSugarComponent,
    BloodPressureComponent,
    BmiComponent,
    CholesterolComponent,
    Hba1cComponent,
    GuageComponent,
    HealthStatusComponent,
    ExpandableComponent,
  ],
  imports: [CommonModule, IonicModule, FormsModule, RouterModule],
  exports: [
    BloodSugarComponent,
    BloodPressureComponent,
    BmiComponent,
    CholesterolComponent,
    Hba1cComponent,
    GuageComponent,
    HealthStatusComponent,
    ExpandableComponent,
  ],
})
export class ComponentsModule {}
