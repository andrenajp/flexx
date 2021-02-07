import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingSuccessPageRoutingModule } from './booking-success-routing.module';

import { BookingSuccessPage } from './booking-success.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookingSuccessPageRoutingModule
  ],
  declarations: [BookingSuccessPage]
})
export class BookingSuccessPageModule {}
