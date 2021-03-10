import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { DirectionPage } from '../direction/direction.page';
import { GiveRatingPage } from '../give-rating/give-rating.page';

import axios from "axios";
import {Router} from '@angular/router';
@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.page.html',
  styleUrls: ['./appointment.page.scss'],
})
export class AppointmentPage implements OnInit {
  appoint:any={};
  selectAppointment = 'upcoming';
  rate: any = 1;
  upcoming: any = [ ]
  past: any = [ ]
  constructor(
    private modalCtrl: ModalController, 
    private nav: NavController,
    private router: Router
    ) { }
  async ngOnInit() 
  {
    try 
    {
      const res=await axios.get('http://157.230.232.108/appointments/');
      const appoints=res.data;
      var idA;
      let  appoint;
      const today=new Date();
      for(idA in appoints)
      {
        appoint=appoints[idA];
        if(new Date(appoint.appointment_date).getTime() > today.getTime())
          this.upcoming.push(appoint);
        else
          this.past.push(appoint);
      } 

    }catch(error){ console.log(error.response)} 

  }
  async rating() {
    const modal = await this.modalCtrl.create({
      component: GiveRatingPage,
      cssClass: 'giverate_modal',
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
}
