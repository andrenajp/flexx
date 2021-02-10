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

  constructor(
    private nav: NavController,
    private authService:AuthService
    ) { }
  check = '../../assets/images/check.svg'
  ngOnInit() {
  }
  login()
  {

    this.authService.useLogin(this.loginForm)
    .subscribe(value => {
      if(value){
        alert('login success');
      }
      else{
        alert('login fails')
      }
    },error => {
      alert('login fails')
    })
  }
  register() {
    this.nav.navigateForward('register')
  }
  forgot() {
    //this.nav.navigateForward('forgot-password')
  }
  change() {
    this.check = this.check === '../../assets/images/check.svg' ? '../../assets/images/checkback.svg' : '../../assets/images/check.svg';
  }
}
