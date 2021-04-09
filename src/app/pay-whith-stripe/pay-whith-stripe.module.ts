import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayWhithStripePageRoutingModule } from './pay-whith-stripe-routing.module';

import { PayWhithStripePage } from './pay-whith-stripe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayWhithStripePageRoutingModule
  ],
  declarations: [PayWhithStripePage]
})
export class PayWhithStripePageModule {}
