import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayWhithStripePage } from './pay-whith-stripe.page';

const routes: Routes = [
  {
    path: '',
    component: PayWhithStripePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayWhithStripePageRoutingModule {}
