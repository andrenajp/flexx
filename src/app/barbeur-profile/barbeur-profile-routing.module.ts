import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BarbeurProfilePage } from './barbeur-profile.page';

const routes: Routes = [
  {
    path: '',
    component: BarbeurProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BarbeurProfilePageRoutingModule {}
