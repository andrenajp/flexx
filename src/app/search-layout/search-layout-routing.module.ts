import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchLayoutPage } from './search-layout.page';

const routes: Routes = [
  {
    path: '',
    component: SearchLayoutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchLayoutPageRoutingModule {}
