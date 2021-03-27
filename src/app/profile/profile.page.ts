import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

import { LanguagePage } from '../language/language.page';
import { SharingPage } from '../sharing/sharing.page';
import { AuthService } from '../login/auth.service';
import { NavigationExtras, Router } from '@angular/router';

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
    public router: Router,
    ) 
  {
     if(!this.authService.isauthenticated())
        router.navigate(['login']);
  }
  ionViewWillEnter() {

  }
  ngOnInit() 
  {
    this.user=JSON.parse(localStorage.getItem('_user'));
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

  uploadImg()
  {
    console.log("Insert img");
  }

  editProfile() {
    if(this.authService.isauthenticated())
      this.nav.navigateForward('edit-profile')
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
    this.nav.navigateForward('login')
  }

  haveProfileIMG()
  {
    if(this.user.profile_img!=null)
      return true;

    return false;
  }
}
