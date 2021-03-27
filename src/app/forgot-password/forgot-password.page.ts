import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';


import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  mail:any;
  constructor(
    private nav: NavController,
    private authService:AuthService
    ) { }

  ngOnInit() {
  }
  setAccount() 
  {
    this.nav.navigateForward('register')
  }
  async verify()
  {
   await this.authService.resetPassword(this.mail);
    //this.nav.navigateForward('verifaction')
  }
}
