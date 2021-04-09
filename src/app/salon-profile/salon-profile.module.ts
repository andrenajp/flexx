import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalonProfilePageRoutingModule } from './salon-profile-routing.module';

import { SalonProfilePage } from './salon-profile.page';
import { IonicStorageModule } from '@ionic/storage';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalonProfilePageRoutingModule
  ],
  declarations: [SalonProfilePage]
})
export class SalonProfilePageModule {}
