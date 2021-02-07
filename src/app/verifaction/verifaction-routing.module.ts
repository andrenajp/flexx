import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerifactionPage } from './verifaction.page';

const routes: Routes = [
  {
    path: '',
    component: VerifactionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerifactionPageRoutingModule {}
