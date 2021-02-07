import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchLayoutPageRoutingModule } from './search-layout-routing.module';

import { SearchLayoutPage } from './search-layout.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchLayoutPageRoutingModule
  ],
  declarations: [SearchLayoutPage]
})
export class SearchLayoutPageModule {}
