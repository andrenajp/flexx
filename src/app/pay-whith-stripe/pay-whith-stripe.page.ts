import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import Stripe from 'stripe';
import { environment} from 'src/environments/environment.prod';
@Component({
  selector: 'app-pay-whith-stripe',
  templateUrl: './pay-whith-stripe.page.html',
  styleUrls: ['./pay-whith-stripe.page.scss'],
})
export class PayWhithStripePage implements OnInit {
  @Input() price;
  cardNumber;
  year;
  month;
  cvv;
  months=[
    {
      name:'01-janvier',
      value:1
    },
    {
      name:'02-Février',
      value:2
    },
    {
      name:'03-Mars',
      value:3
    },
    {
      name:'04-Avril',
      value:4
    },
    {
      name:'05-Mai',
      value:5
    },
    {
      name:'06-Juin',
      value:6
    },
    {
      name:'07-Juillet',
      value:7
    },
    {
      name:'08-Août',
      value:8
    },
    {
      name:'09-Septembre',
      value:9
    },
    {
      name:'10-Octobre',
      value:10
    },
    {
      name:'11-Novembre',
      value:'11'
    },
    {
      name:'12-Décembre',
      value:'12'
    }
  ]
  years=[];

  constructor( private modalCtrl: ModalController ) { }

  ngOnInit() 
  {
    const toDay=new Date();
    const year=toDay.getFullYear();

    for(var i=0;i<15;i++)
      this.years.push(year+i);
  }


  closeModal()
  {
    this.modalCtrl.dismiss(null,'cancel');
  }
  pay()
  {
    const card={
      'number':this.cardNumber,
      'month':this.month,
      'year':this.year,
      'cvv':this.cvv
    }
    this.modalCtrl.dismiss(card,'pay');
  }
}
