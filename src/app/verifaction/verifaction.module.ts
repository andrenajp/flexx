import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerifactionPageRoutingModule } from './verifaction-routing.module';

import { VerifactionPage } from './verifaction.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerifactionPageRoutingModule
  ],
  declarations: [VerifactionPage]
})
export class VerifactionPageModule {}
