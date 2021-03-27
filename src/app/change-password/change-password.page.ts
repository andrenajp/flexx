import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import axios from 'axios';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  userID:any;
  email:any;
  goodPass:boolean=false;
  password:any;
  newPassword:any;
  confirmPassword:any;
  constructor(
    private nav: NavController,
    private auth: AuthService
    ) { }

  ngOnInit()
  {
    const user=JSON.parse(localStorage.getItem('_user'));
    this.email= user.email;
    this.userID=user.id;
  }
  goNext() {
    this.nav.navigateForward('tabs/home')
  }
  checkPassword()
  {
    const login={
      email: this.email,
      password: this.password
    }
    try
    {
      this.auth.checkPassword(login);
      this.goodPass=true;
    }
    catch(error)
    { 
      console.log(error.response)
    } 
  }
  changePass()
  {
    this.checkPassword();
    if(this.goodPass)
    {
      if(this.newPassword === this.confirmPassword)
      {
        axios.put('http://157.230.232.108/users/'+this.userID,{password: this.password}).then(()=>{
          console.log("new pass",this.password)
        });
      }
    }
    else{ console.log('nice try')}
    console.log(this.password +' => '+this.email)
  }

  resetPass()
  {
    this.goodPass=false;
  }
}
