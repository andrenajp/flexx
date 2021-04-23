import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileImagePageRoutingModule } from './profile-image-routing.module';

import { ProfileImagePage } from './profile-image.page';

import { Camera } from '@ionic-native/camera/ngx';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileImagePageRoutingModule
  ],
  providers:[Camera],
  declarations: [ProfileImagePage]
})
export class ProfileImagePageModule {}
