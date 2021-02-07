import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

declare var window;
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private nav: NavController) { }
  check = '../../assets/images/check.svg'
  ngOnInit() {
  }
  login() {

    this.nav.navigateForward('tabs/home')

  }
  register() {
    this.nav.navigateForward('register')
  }
  forgot() {
    this.nav.navigateForward('forgot-password')
  }
  change() {
    this.check = this.check === '../../assets/images/check.svg' ? '../../assets/images/checkback.svg' : '../../assets/images/check.svg';
  }
}
