import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

import axios from 'axios';
import {AppointmentService} from '../appointment/appointment.service';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  salon:any={};
  emp:any={};
  service:any={};
  date:Date;
  constructor(
    private nav: NavController,
    private readonly storage:Storage,
    private appointRdv:AppointmentService
    )
  {

  }

  ngOnInit() 
  {
    
    this.storage.get('appoint_salon').then((val) => {
      axios.get('http://157.230.232.108/salons/'+Number(val)).then(response => {
        this.salon=response.data;
      });
    });
    this.storage.get('appoint_Emp').then((val) => {
      this.emp=JSON.parse(val);
    });
    this.storage.get('appoint_date').then((val) => {
      this.date=val;
      
      console.log(this.date)
    });

  }
  makePayment() {
    this.appointRdv.setAppointment(this.salon.id,this.emp.id,this.date)
    console.log(this.salon.id,this.emp.id,this.date)
    this.nav.navigateForward('booking-success')
  }
  addNew() {
    this.nav.navigateForward('salon-profile');
  }
}
