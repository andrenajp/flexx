import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GiveRatingPageRoutingModule } from './give-rating-routing.module';

import { GiveRatingPage } from './give-rating.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GiveRatingPageRoutingModule
  ],
  declarations: [GiveRatingPage]
})
export class GiveRatingPageModule {}
