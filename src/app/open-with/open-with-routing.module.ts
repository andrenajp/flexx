import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpenWithPage } from './open-with.page';

const routes: Routes = [
  {
    path: '',
    component: OpenWithPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpenWithPageRoutingModule {}
