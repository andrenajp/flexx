import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HourPage } from './hour.page';

const routes: Routes = [
  {
    path: '',
    component: HourPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HourPageRoutingModule {}
