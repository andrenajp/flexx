import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

import axios from 'axios';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DirectionPage } from '../direction/direction.page';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-appointment-detail',
  templateUrl: './appointment-detail.page.html',
  styleUrls: ['./appointment-detail.page.scss'],
})
export class AppointmentDetailPage implements OnInit {
  url=environment.BASE_URL;
  appointment:any={};
  type;
  salon:any={};
  emp:any={};
  service:any=[];
  price:number=0;
  barber:any={};
  order:any={};
  charge:number=400;
  header={
    Authorization : 'Bearer '+ localStorage.getItem('access_token')
  };
  constructor(
    private nav: NavController, 
    private modal: ModalController,
    private route: ActivatedRoute,
    public alertController: AlertController
  ) 
  {

    
  }

  ngOnInit() 
  {
    this.route.queryParams.subscribe((res) => {
      const idA = res.id;
      axios.get(this.url+'/appointments/'+idA,{headers:this.header}).then(response => {
        this.appointment=response.data;
        this.type=response.data.type;
        if(this.type=="salon")
        {
          this.salon=response.data.salon;
          this.emp=response.data.employee;
          
        }else
          this.barber=response.data.barber;

        this.service=response.data.services;
        this.order=response.data.order
        for(var i in this.service)
        {
          this.price=this.price + this.service[i].price;
        }
      });
    }); 
  }

  async cancelAppoint()
  {
    const data={
      appointment:this.appointment.id,
      order:this.order.id,
      pay_int:this.order.payment_intent
    }

    const alert = await this.alertController.create({
      header: 'Annuler le rendez-vous',
      message: 'voulez-vous vraiment annuler votre rendez vous ?',
      buttons: [
        {
          text:'Oui',
          role:'confirmation',
          handler:async ()=>{
            await axios.post(this.url+'/appointments/cancel',data,{headers :this.header}).then(async () => {
              await this.nav.navigateRoot(['cancel-appointment']);
          });
          }
        },
        {
          text:'Annuler',
          role:'cancel',
          handler:()=>{
            
          }
        }]
    });
    await alert.present();
  }

  async successAppoint()
  {
    const data={
      appointment:this.appointment.id,
      order:this.order.id,
      price:(this.price - this.charge)*100,
      strp_connect:(this.type=='salon') ? this.salon.strp_connect : this.barber.strp_connect,
      transfer_group:this.order.transfer_group,
      salon:(this.type=='salon') ? this.salon.id : null,
      barber:(this.type=='barber') ? this.barber.id : null
    }
    await axios.post(this.url+'/appointments/confirm',data,{headers:this.header}).catch((error)=>{console.log(error.response)});
  
  }
  async getDirection()
  {
    const modal = await this.modal.create({
      component: DirectionPage,
      cssClass: 'DirectionPage',
      componentProps:{"salon" : this.salon,"pathBack": "/tabs/appointment"}   
    });
    return await modal.present();
  }

}
