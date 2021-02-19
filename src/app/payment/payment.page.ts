import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

import axios from 'axios';
import {AppointmentService} from '../appointment/appointment.service';
import {Storage} from '@ionic/storage';

import { ModalController } from '@ionic/angular';
import { ServicesModalComponent } from '../services-modal/services-modal.component';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  salon:any={};
  emp:any={};
  service:any={};
  serviceSelect:any=[];
  nameServiceSelect:any=[];
  date:Date;
  price:Number=0;
  serviceCharge:Number=5;
  constructor(
    private nav: NavController,
    private readonly storage:Storage,
    private appointRdv:AppointmentService,
    public modalCtrl:ModalController
    )
  {

  }

  ngOnInit() 
  {
    
    this.storage.get('appoint_salon').then((val) => {
      axios.get('http://157.230.232.108/salons/'+Number(val)).then(response => {
        this.salon=response.data;
        this.service=response.data.services;
      });
    });
    this.storage.get('appoint_Emp').then((val) => {
      this.emp=JSON.parse(val);
    });
    this.storage.get('appoint_date').then((val) => {
      this.date=val;

    });

  }
  makePayment() 
  {
    this.appointRdv.setAppointment(this.salon.id,this.emp.id,this.date,this.serviceSelect)
    this.nav.navigateForward('booking-success')
  }
  async addNew() 
  {
    //Problème aux ajouts possibilité d'ajouter le même service deux fois
    const modal = await this.modalCtrl.create({
      component:ServicesModalComponent,
      componentProps:{ services:this.service,serviceSelect:this.serviceSelect}
    });

    await modal.present();
    const {data:s ,role} =await modal.onDidDismiss();
    
    if(role === "ajouter")
    {
      for(var idS in s)      
        if (s[idS])
          axios.get('http://157.230.232.108/services/'+Number(idS)).then(response => {
            this.serviceSelect.push({"id":Number(response.data.id),"name":response.data.name,"price":response.data.price})
            this.price=this.price +response.data.price;
          });
    }
  }

  async removeService(service)
  {
      const indexOf=this.serviceSelect.indexOf(service);
      if (indexOf > -1) {
        await this.serviceSelect.splice(indexOf, 1);
      }
  }
  
}
