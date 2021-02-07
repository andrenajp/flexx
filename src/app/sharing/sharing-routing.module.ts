import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharingPage } from './sharing.page';

const routes: Routes = [
  {
    path: '',
    component: SharingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharingPageRoutingModule {}
