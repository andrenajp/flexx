import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectEmployeePageRoutingModule } from './select-employee-routing.module';

import { SelectEmployeePage } from './select-employee.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectEmployeePageRoutingModule
  ],
  declarations: [SelectEmployeePage]
})
export class SelectEmployeePageModule {}
