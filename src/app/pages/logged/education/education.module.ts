import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EducationPageRoutingModule } from './education-routing.module';

import { EducationPage } from './education.page';
import { CategoryComponent } from './category/category.component';
import { SingleComponent } from './single/single.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, EducationPageRoutingModule],
  declarations: [EducationPage, CategoryComponent, SingleComponent],
})
export class EducationPageModule {}
