import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import axios from 'axios';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  url=environment.BASE_URL;
  header={
    Authorization : 'Bearer '+ localStorage.getItem('access_token')
  };
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
    await axios.put(this.url+'/users/'+this.user.id,data,{headers : this.header}).then(()=>{
        this.user.username=this.name;
        this.user.email=this.email;
        this.user.sexe=this.sexe;
        this.user.phone=this.phone;
        localStorage.removeItem('_user');
        localStorage.setItem('_user',JSON.stringify(this.user));
    });
    this.nav.navigateForward('tabs/profile')

  }
}
