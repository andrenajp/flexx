import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HourPageRoutingModule } from './hour-routing.module';

import { HourPage } from './hour.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HourPageRoutingModule
  ],
  declarations: [HourPage]
})
export class HourPageModule {}
