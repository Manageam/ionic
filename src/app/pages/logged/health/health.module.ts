import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HealthPageRoutingModule } from './health-routing.module';

import { HealthPage } from './health.page';
import { GuageComponent } from 'src/app/components/guage/guage.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HealthPageRoutingModule],
  declarations: [HealthPage, GuageComponent],
})
export class HealthPageModule {}
