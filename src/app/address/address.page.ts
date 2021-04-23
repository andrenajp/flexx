import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import axios from 'axios';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {
  url=environment.BASE_URL;
  address:any;
  user=JSON.parse(localStorage.getItem("_user"));
  


  header={
    Authorization : 'Bearer '+ localStorage.getItem('access_token')
  };
  constructor(
    private nav :NavController
  ) { }

  ngOnInit() {
    this.address=this.user.address;
  }

  edit()
  {
    axios.put(this.url+'/users/'+this.user.id,{address:this.address},{headers:this.header});
  }

}
