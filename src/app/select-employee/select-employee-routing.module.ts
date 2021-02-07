import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectEmployeePage } from './select-employee.page';

const routes: Routes = [
  {
    path: '',
    component: SelectEmployeePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectEmployeePageRoutingModule {}
