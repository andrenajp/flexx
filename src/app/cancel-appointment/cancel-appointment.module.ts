import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CancelAppointmentPageRoutingModule } from './cancel-appointment-routing.module';

import { CancelAppointmentPage } from './cancel-appointment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CancelAppointmentPageRoutingModule
  ],
  declarations: [CancelAppointmentPage]
})
export class CancelAppointmentPageModule {}
