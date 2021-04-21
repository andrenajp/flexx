import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { DirectionPage } from '../direction/direction.page';
import { GiveRatingPage } from '../give-rating/give-rating.page';
import axios from "axios";
import {Router} from '@angular/router';

import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.page.html',
  styleUrls: ['./appointment.page.scss'],
})
export class AppointmentPage implements OnInit {
  url=environment.BASE_URL;
  appoint:any={};
  selectAppointment = 'upcoming';
  rate: any = 1;
  upcoming: any = [ ];
  past: any = [ ];
  cancel: any=[ ];
  header={
    Authorization : 'Bearer '+ localStorage.getItem('access_token')
  };
  user = JSON.parse(localStorage.getItem('_user'));
  constructor(
    private modalCtrl: ModalController, 
    private nav: NavController,
    private router: Router
    ) { }
  async ngOnInit() 
  {
    if(this.isLog())
    {
      await axios.get(this.url+'/appointments?user='+this.user.id,{headers :this.header}).then((response)=>{
        const appoints=response.data;
        console.log(appoints);
        var idA;
        let  appoint;
        const today=new Date();
        for(idA in appoints)
        {
          appoint=appoints[idA];
          //if(new Date(appoint.day).getTime() > today.getTime())
          if(appoint.status=="upcoming")
            this.upcoming.push(appoint);
          else if(appoint.status=="completed")
            this.past.push(appoint);
          else if((new Date(appoint.day).getTime() > today.getTime() ) ||appoint.status=="canceled" )
            this.cancel.push(appoint);
        } 
      }).catch(error=>{console.log(error.response)});
    }

  }
  async rating(salon,appoint) {

    const modal = await this.modalCtrl.create({
      component: GiveRatingPage,
      cssClass: 'giverate_modal',
      componentProps:{"salon" : salon,"appoint" : appoint}   

    });
    return await modal.present();
  }
  async direction(salon) {
    const modal = await this.modalCtrl.create({
      component: DirectionPage,
      cssClass: 'DirectionPage',
      componentProps:{"salon" : salon,"pathBack": "/tabs/appointment"}   
    });
    return await modal.present();
  }
  detail(appoint)
  {
    this.router.navigate(["/appointment-detail"],{
      queryParams:{id:appoint.id},
    });
  }

  isLog()
  {
    if(localStorage.getItem('_user') ==null)
      return false;
    return true;
  }

}
