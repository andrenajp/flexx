import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BarbeurProfilePageRoutingModule } from './barbeur-profile-routing.module';

import { BarbeurProfilePage } from './barbeur-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BarbeurProfilePageRoutingModule
  ],
  declarations: [BarbeurProfilePage]
})
export class BarbeurProfilePageModule {}
