import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  name: any = '';
  email: any = '';
  password: any = '';
  confirmpassword: any = '';
  contact: any = '';
  err: any = {};
  deviceToken: any;
  constructor(private nav: NavController) { }
  ngOnInit() {
  }
  login() {
    this.nav.navigateForward('login')
  }
  signup() {

  }
  verify() {

  }
}
