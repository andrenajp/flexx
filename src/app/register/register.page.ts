import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { RegisterService} from './register.service';
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
  constructor(
    private nav: NavController,
    private register :RegisterService
    ) { }
  ngOnInit() {
  }
  login() {
    this.nav.navigateForward('login')
  }
  signup() 
  {
    const data = { 
      "surname": this.name ,
      "email": this.email,
      "password":this.password
    }
    this.register.sign(data);
  }
  verify() 
  {
    console.log('vérifie')
    if(this.password===this.confirmpassword)
      this.signup();
    else
      console.log('mot de passe pas identique')

      
  }
}
