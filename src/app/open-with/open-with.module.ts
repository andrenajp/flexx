import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpenWithPageRoutingModule } from './open-with-routing.module';

import { OpenWithPage } from './open-with.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpenWithPageRoutingModule
  ],
  declarations: [OpenWithPage]
})
export class OpenWithPageModule {}
