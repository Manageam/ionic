import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoggedRoutingModule } from './logged-routing.module';
import { HomeComponent } from 'src/app/layouts/home/home.component';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from 'src/app/components/menu/menu.component';

@NgModule({
  declarations: [HomeComponent, MenuComponent],
  imports: [CommonModule, LoggedRoutingModule, IonicModule],
})
export class LoggedModule {}
