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
  date:Date;
  price:Number=0;
  serviceCharge:Number=5;
  totalPrice:Number=0;
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
    this.storage.get('appoint_services').then((val) => {
      
      this.serviceSelect=val;
      for(var i in this.serviceSelect)
        this.price=Number(this.price) + Number(this.serviceSelect[i].price);
      this.totalPrice=Number(this.price) + Number(this.serviceCharge);
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
  

  async removeService(service)
  {
      const indexOf=this.serviceSelect.indexOf(service);
      if (indexOf > -1) {
        this.totalPrice=Number(this.totalPrice) - Number(service.price);
        this.price=Number(this.price) - Number(service.price)
        await this.serviceSelect.splice(indexOf, 1);
      }
  }

}
