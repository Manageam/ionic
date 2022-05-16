import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HealthPageRoutingModule } from './health-routing.module';
import { HealthPage } from './health.page';
import { ComponentsModule } from 'src/app/modules/shared/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HealthPageRoutingModule,
    ComponentsModule,
    ComponentsModule,
  ],
  declarations: [HealthPage],
})
export class HealthPageModule {}
