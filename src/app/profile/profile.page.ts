import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

import { LanguagePage } from '../language/language.page';
import { SharingPage } from '../sharing/sharing.page';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: any;
  constructor(private nav: NavController, private modalCtrl: ModalController) {


  }
  ionViewWillEnter() {

  }
  ngOnInit() {
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
  editProfile() {
    this.nav.navigateForward('edit-profile')
  }
  privacy() {
    this.nav.navigateForward('privacy-policy')
  }
  terms() {
    this.nav.navigateForward('terms-condition');
  }
  aboutUs() {
    this.nav.navigateForward('about')
  }
  logout() {
    localStorage.clear()
    this.nav.navigateForward('login')
  }
}
