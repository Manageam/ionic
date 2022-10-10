import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoggedRoutingModule } from './logged-routing.module';
import { HomeComponent } from 'src/app/layouts/home/home.component';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from 'src/app/modals/menu/menu.component';
import { LocationsComponent } from 'src/app/modals/locations/locations.component';
import { ProfileComponent } from 'src/app/modals/profile/profile.component';
import { UpdateProfileComponent } from 'src/app/modals/update-profile/update-profile.component';
import { UpdatePictureComponent } from 'src/app/modals/update-picture/update-picture.component';
import { FormsModule } from '@angular/forms';
import { UpdatePasswordComponent } from 'src/app/modals/update-password/update-password.component';

@NgModule({
  declarations: [
    HomeComponent,
    MenuComponent,
    LocationsComponent,
    ProfileComponent,
    UpdateProfileComponent,
    UpdatePictureComponent,
    UpdatePasswordComponent,
  ],
  imports: [CommonModule, FormsModule, LoggedRoutingModule, IonicModule],
})
export class LoggedModule {}
