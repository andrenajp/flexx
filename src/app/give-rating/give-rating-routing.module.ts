import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GiveRatingPage } from './give-rating.page';

const routes: Routes = [
  {
    path: '',
    component: GiveRatingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GiveRatingPageRoutingModule {}
