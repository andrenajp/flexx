import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import axios from 'axios';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  user:any;
  name:any;
  email:any; 
  sexe:any;
  phone:any;

  constructor(
    private nav: NavController,
  ) { }

  ngOnInit() 
  {
    this.user=JSON.parse(localStorage.getItem('_user'));
    this.name=this.user.username;
    this.email=this.user.email;
    this.phone=this.user.phone;
    this.sexe=this.user.sexe;
  }

  isSexe(s)
  {
    if(this.sexe==s)
      return true;
    else
      return false;
  }

  async update()
  {
    const data={
      username: this.name,
      email: this.email,
      sexe: this.sexe,
      phone:this.phone
    };
    await axios.put('http://157.230.232.108/users/'+this.user.id,data);
    this.nav.navigateForward('tabs/profile')

  }
}
