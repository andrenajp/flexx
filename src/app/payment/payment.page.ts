import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import axios from 'axios';
import {Storage} from '@ionic/storage';

import { ModalController } from '@ionic/angular';
import { VariableBinding } from '@angular/compiler';

import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
import { Stripe as Strp} from '@ionic-native/stripe/ngx';
import stripe from 'stripe';
import { environment } from 'src/environments/environment.prod';

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
      "name":"Paypal",
      "icon":"../../assets/images/paypal.svg"
    },
    {
      "name":"Stripe",
      "icon":"../../assets/images/stripe.svg"
    },
    {
      "name":"Espèce",
      "icon":"../../assets/images/cod.svg"
    },
    
  ];

  paymentBis:any=[
    {
      "name":"Paypal",
      "icon":"../../assets/images/paypal.svg"
    },
    {
      "name":"Razorpay",
      "icon":"../../assets/images/razorpay.svg"
    },
    {
      "name":"Stripe",
      "icon":"../../assets/images/stripe.svg"
    },
    {
      "name":"COD",
      "icon":"../../assets/images/cod.svg"
    },
    
  ];
  paymentWith:any;

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
          axios.get(this.url+'salons/'+res.id).then(response => {
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

    this.payWithStripe();
   /*
    if( this.AppointType=='Salon')
      this.setSalonAppointment(this.salon.id,this.emp.id,this.date,this.serviceSelect);
    else if(this.AppointType =='Barber')
      this.setBarberAppointment(this.serviceSelect,this.address,this.date);
    
    this.nav.navigateForward('booking-success');
    */

  }

  withPayPal()
  {
    
    this.payPal.init({
      PayPalEnvironmentProduction: 'ATdhzByIIbA6XAEImyv0jq4R5y8xZTBMzmyEZBmnFt9T6iOqjfc6CaLoM2S3DtyIYplDKJFo9LK53EjY',
      PayPalEnvironmentSandbox: 'ATtRebYCXAAK7Sx-9kngpN8F8kXw20ADz3o0Gavtv75_6iOTEcxkNYkewm3ljzcZ7zUEkgLXLQYcRTCf'
    }).then(() => {
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
      })).then(() => {
        let payment = new PayPalPayment(''+this.totalPrice, 'EUR', 'Description', 'sale');
        this.payPal.renderSinglePaymentUI(payment).then((response) => {
          // {
          //   "client": {
          //     "environment": "sandbox",
          //     "product_name": "PayPal iOS SDK",
          //     "paypal_sdk_version": "2.16.0",
          //     "platform": "iOS"
          //   },
          //   "response_type": "payment",
          //   "response": {
          //     "id": "PAY-1AB23456CD789012EF34GHIJ",
          //     "state": "approved",
          //     "create_time": "2016-10-03T13:33:33Z",
          //     "intent": "sale"
          //   }
          // }
        }, (error) => {
          console.log('erreur'+ error)
          console.log(error.response)
          // Error or render dialog closed without being successful
        });
      }, (error) => {
        console.log(error.response)
        // Error in configuration
      });
    }, (error) => {
      console.log(error.response)
      // Error in initialization, maybe PayPal isn't supported or something else
    });
  }
  
  setSalonAppointment(salon,employee,date,services)
  {
    let idService=[];
    for (var i in services)
      idService.push({"id":services[i].id});
    
    axios.post(this.url+'salon-appointments', {
        day:date,
        salon: {"id":salon},
        user:this.user.id,
        employee: {"id":employee},
        services:idService,
        price:this.totalPrice
      },{headers:this.header}).then(()=>{
        this.storage.remove("appoint_salon");
        this.storage.remove("appoint_Emp");
        this.storage.remove("appoint_date");
        this.storage.remove("appoint_services");
    });
  }

  setBarberAppointment(services,address,date)
  {
    let idService=[];
    for (var i in services)
      idService.push({"id":services[i].id});
    
    axios.post(this.url+'barber-appointments', {
        day:date,
        barber:this.barber,
        user:this.user.id,
        services:idService,
        address:address
      },{headers:this.header}).then(()=>{
        this.storage.remove("appoint_address");
        this.storage.remove("appoint_date");
        this.storage.remove("appoint_services");
    }).catch((error)=>{
      console.log(error.response);
    });
  }

  async payWithStripe()
  {

  }

}
