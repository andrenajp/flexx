import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectServicePage } from './select-service.page';

const routes: Routes = [
  {
    path: '',
    component: SelectServicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectServicePageRoutingModule {}
