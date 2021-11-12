import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoggedRoutingModule } from './logged-routing.module';
import { HomeComponent } from 'src/app/layouts/home/home.component';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { LocationsComponent } from 'src/app/components/locations/locations.component';
import { ProfileComponent } from 'src/app/components/profile/profile.component';
import { UpdateProfileComponent } from 'src/app/components/update-profile/update-profile.component';
import { UpdatePictureComponent } from 'src/app/components/update-picture/update-picture.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    MenuComponent,
    LocationsComponent,
    ProfileComponent,
    UpdateProfileComponent,
    UpdatePictureComponent,
  ],
  imports: [CommonModule, FormsModule, LoggedRoutingModule, IonicModule],
})
export class LoggedModule {}
