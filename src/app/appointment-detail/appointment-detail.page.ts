import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

import axios from 'axios';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-appointment-detail',
  templateUrl: './appointment-detail.page.html',
  styleUrls: ['./appointment-detail.page.scss'],
})
export class AppointmentDetailPage implements OnInit {
  appointment:any={};
  salon:any={};
  emp:any={};
  service:any=[];
  price:Number=0;
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
      axios.get('http://157.230.232.108/appointments/'+idA).then(response => {
        this.appointment=response.data;
        this.salon=response.data.salon;
        this.emp=response.data.employee;
        this.service=response.data.services;
        for(var i in this.service)
        {
          this.price=this.price + this.service[i].price;
        }
      });
    }); 
  }

  async cancelAppoint()
  {

    const alert = await this.alertController.create({
      header: 'Annuler le rendez-vous',
      message: 'voulez-vous vraiment annuler votre rendez vous ?',
      buttons: [
        {
          text:'Oui',
          role:'confirmation',
          handler:()=>{
            axios.delete('http://157.230.232.108/appointments/'+this.appointment.id).then(response => {
              this.nav.navigateForward('tabs/appointment');
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

}
