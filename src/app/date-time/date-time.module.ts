import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DateTimePageRoutingModule } from './date-time-routing.module';

import { DateTimePage } from './date-time.page';
import { CalendarModule } from 'ion2-calendar';
import {AppointmentService} from '../Appointment/appointment.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DateTimePageRoutingModule,
    CalendarModule
  ],
  providers:[
    AppointmentService
  ],
  declarations: [DateTimePage]
})
export class DateTimePageModule { }
