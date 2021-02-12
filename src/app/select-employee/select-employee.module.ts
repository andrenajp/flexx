import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectEmployeePageRoutingModule } from './select-employee-routing.module';

import { SelectEmployeePage } from './select-employee.page';
import {AppointmentService} from '../Appointment/appointment.service';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectEmployeePageRoutingModule
  ],
  providers:[
    AppointmentService
  ],
  declarations: [SelectEmployeePage]
})
export class SelectEmployeePageModule {}
