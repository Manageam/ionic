import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReminderPageRoutingModule } from './reminder-routing.module';

import { ReminderPage } from './reminder.page';
import { ComponentsModule } from 'src/app/modules/shared/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReminderPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [ReminderPage],
})
export class ReminderPageModule {}
