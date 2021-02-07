import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  constructor(private nav: NavController) { }

  ngOnInit() {
  }
  setAccount() {
    this.nav.navigateForward('register')
  }
  verify() {
    this.nav.navigateForward('verifaction')
  }
}
