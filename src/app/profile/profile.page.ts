import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

import { LanguagePage } from '../language/language.page';
import { SharingPage } from '../sharing/sharing.page';
import { ProfileImagePage } from '../profile-image/profile-image.page';
import { AuthService } from '../login/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: any;
  dateSign:any;
  constructor(
    private nav: NavController,
    private modalCtrl: ModalController,
    private authService:AuthService,
    private router:Router
    ) 
  {
    this.user=JSON.parse(localStorage.getItem('_user'));
  }
  async ngOnInit() 
  {
    this.user=await JSON.parse(localStorage.getItem('_user'));
    this.dateSign=new Date(this.user.created_at);
  }


  async shareWith() {
    const modal = await this.modalCtrl.create({
      component: SharingPage,
      cssClass: 'SharingPage',
    });
    return await modal.present();
  }
  async language() {
    const modal = await this.modalCtrl.create({
      component: LanguagePage,
      cssClass: 'LanguagePage',
    });
    return await modal.present();
  }

  async upload()
  {
    const modal = await this.modalCtrl.create({
      component: ProfileImagePage,
      cssClass: 'ProfileImagePage',
      componentProps:{user:this.user.id}
    });
    return await modal.present(); 
  }

  async editProfile() 
  {
      await this.nav.navigateRoot(['edit-profile']);
  }
  async address()
  {
    await this.nav.navigateRoot(['address']);

  }
  changePassword()
  {
    this.nav.navigateRoot(['change-password'])
  }
  privacy() {
    this.nav.navigateRoot(['privacy-policy'])
  }
  terms() {
    this.nav.navigateRoot(['terms-condition']);
  }
  aboutUs() {
    this.nav.navigateRoot(['about'])
  }
  logout() {
    this.authService.logout();
  }
  register()
  {
    this.nav.navigateRoot(['register']);
  }
}
