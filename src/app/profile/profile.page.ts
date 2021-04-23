import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

import { LanguagePage } from '../language/language.page';
import { SharingPage } from '../sharing/sharing.page';
import { ProfileImagePage } from '../profile-image/profile-image.page';
import { AuthService } from '../login/auth.service';

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
    ) 
  {
    if(localStorage.getItem('_user') == null)
      this.nav.navigateForward('login');
  }
  ionViewWillEnter() {

  }
  async ngOnInit() 
  {
    if(localStorage.getItem('_user') == null)
     await this.nav.navigateForward('login');

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

  async editProfile() {
    if(this.authService.isauthenticated())
      await this.nav.navigateForward('edit-profile');
  }
  async address()
  {
    await this.nav.navigateForward('address');

  }
  changePassword()
  {
    if(this.authService.isauthenticated())
      this.nav.navigateForward('change-password')
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
    this.nav.navigateForward('tabs/home')
  }

  haveProfileIMG()
  {
    if(this.user.profile_img!=null)
      return true;

    return false;
  }

  login()
  {
    this.nav.navigateForward('login');

  }
  register()
  {
    this.nav.navigateForward('register');
  }
}
