import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import axios from 'axios';
import { Storage } from '@ionic/storage';

import { AuthService } from './auth.service';

declare var window;
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm = {
    email:'',
    password:''
  };
  error:string="";
  constructor(
    private nav: NavController,
    private authService:AuthService
    ) { }
  check = '../../assets/images/check.svg'
  ngOnInit(){
    if(this.authService.isauthenticated())
      this.nav.navigateForward('tabs/home')
  }
  async login()
  {
    await this.authService.useLogin(this.loginForm);
    if(this.authService.isauthenticated())
      this.nav.navigateForward('tabs/home');
    else
    {
      this.loginForm.password="";
      this.error="Mauvais mot de passe ou email !!"
    }
    return false;
  }
  backHome()
  {
    this.nav.navigateForward('tabs/home')
  }
  register() 
  {
    this.nav.navigateForward('register')
  }
  forgot() {
    this.nav.navigateForward('forgot-password')
  }
  change() {
    this.check = this.check === '../../assets/images/check.svg' ? '../../assets/images/checkback.svg' : '../../assets/images/check.svg';
  }
}
