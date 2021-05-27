import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChoosePage } from './choose.page';

const routes: Routes = [
  {
    path: '',
    component: ChoosePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChoosePageRoutingModule {}
