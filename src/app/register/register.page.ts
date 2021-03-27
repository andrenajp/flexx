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
  sexe:any=[{}]
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
    if(this.verify())
    {
      const data = { 
        "surname": this.name ,
        "email": this.email,
        "password":this.password,
        "sexe":this.sexe,
        "phone":this.contact
      }
      this.register.sign(data);
      this.nav.navigateForward('tabs/home')

    }
    else
      console.log("Aieieiei")
  }
  verify() 
  {
    if(this.password===this.confirmpassword)
      return true;
    else
      return false;
  }
}
