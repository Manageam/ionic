import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EducationPageRoutingModule } from './education-routing.module';

import { EducationPage } from './education.page';
import { CategoryComponent } from './category/category.component';
import { SingleComponent } from './single/single.component';
import { ComponentsModule } from 'src/app/modules/shared/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EducationPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [EducationPage, CategoryComponent, SingleComponent],
})
export class EducationPageModule {}
