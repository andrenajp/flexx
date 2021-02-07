import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TermsConditionPage } from './terms-condition.page';

const routes: Routes = [
  {
    path: '',
    component: TermsConditionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TermsConditionPageRoutingModule {}
