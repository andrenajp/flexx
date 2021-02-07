import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharingPageRoutingModule } from './sharing-routing.module';

import { SharingPage } from './sharing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharingPageRoutingModule
  ],
  declarations: [SharingPage]
})
export class SharingPageModule {}
