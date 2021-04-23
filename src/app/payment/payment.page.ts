import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import axios from 'axios';
import {Storage} from '@ionic/storage';

import { ModalController } from '@ionic/angular';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
import { Stripe as Strp} from '@ionic-native/stripe/ngx';
import { environment } from 'src/environments/environment.prod';

import { loadStripe } from '@stripe/stripe-js';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  
  stripeKey=environment.stripeToken;
  url=environment.BASE_URL;
  AppointType:any;
  salon:any={};
  barber:any={};
  emp:any={};
  serviceSelect:any=[];
  address:any;
  date:Date;
  price:Number=0;
  serviceCharge:Number=5;
  totalPrice:Number=0;
  payment:any=[
    {
      "name":"Stripe",
      "icon":"../../assets/images/stripe.svg"
    },
    {
      "name":"Espèce",
      "icon":"../../assets/images/cod.svg"
    },
    
  ];
  paymentWith:any="Stripe";

  header={
    Authorization : 'Bearer '+ localStorage.getItem('access_token')
  };
  user=JSON.parse(localStorage.getItem('_user'));

  constructor(
    private nav: NavController,
    private readonly storage:Storage,
    public modalCtrl:ModalController,
    private payPal: PayPal,
    private strp:Strp
    ){  }

  ngOnInit() 
  {
    this.storage.get('typeRDV').then((value)=>{
      this.AppointType=value;
      if(this.AppointType =='Salon')
      {
        this.storage.get('appoint_salon').then((res) => {
          axios.get(this.url+'/salons/'+res.id).then(response => {
            this.salon=response.data;
          });
        });
        this.storage.get('appoint_Emp').then((val) => {
          this.emp=JSON.parse(val);
        });
      }else if(this.AppointType =='Barber')
      {
        this.storage.get('appoint_address').then((val)=>{
          this.address=val;
        });
        this.storage.get('appoint_barber').then((val)=>{
          this.barber=val;
        })
      }

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
    if( this.AppointType=='Salon')
      this.setSalonAppointment(this.salon.id,this.emp.id,this.date,this.serviceSelect);
    else if(this.AppointType =='Barber')
      this.setBarberAppointment(this.serviceSelect,this.date);

      if(this.paymentWith=="Espèce")
      this.nav.navigateRoot(['booking-success']);
  }

  setSalonAppointment(salon,employee,date,services)
  {
    let idService=[];
    for (var i in services)
      idService.push({"id":services[i].id});
    
    axios.post(this.url+'/appointments', {
        user:this.user.id,
        employee: {"id":employee},
        services:idService,
        "status":"upcoming",
        "type":"salon",
        day:date,
        price:this.totalPrice,
        salon: {"id":salon}
      },{headers:this.header}).then((response)=>{
        const data=response.data;

        if(this.paymentWith=="Stripe")
          this.payWithStripe(data.id);
        this.storage.remove("appoint_salon");
        this.storage.remove("appoint_Emp");
        this.storage.remove("appoint_date");
        this.storage.remove("appoint_services");
    });
  }

  setBarberAppointment(services,date)
  {
    let idService=[];
    for (var i in services)
      idService.push({"id":services[i].id});
    
    axios.post(this.url+'/appointments', {
        user:this.user.id,
        services:idService,
        "status":"upcoming",
        "type":"salon",
        day:date,
        price:this.totalPrice,
        barber:this.barber

      },{headers:this.header}).then((response)=>{
        const data=response.data;
        if(this.paymentWith=="Stripe")
          this.payWithStripe(data.id);
        this.storage.remove("appoint_address");
        this.storage.remove("appoint_date");
        this.storage.remove("appoint_services");

    }).catch((error)=>{
      console.log(error.response);
    });
  }

  async payWithStripe(appointment)
  {
    const data={
      "appointment":{"id":appointment}
    }
    
    const stripe = await loadStripe(this.stripeKey);
    await axios.post(this.url+'/orders',data,{headers :this.header}).then((response)=>{
        const sessionId=response.data.id;
        stripe.redirectToCheckout({sessionId: sessionId});
      });
  }

}
