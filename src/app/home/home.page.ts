import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ModalController, NavController } from '@ionic/angular';
import axios from 'axios';

import { LocationPage } from '../location/location.page';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  nearbysalon: any = [{
    img: '../../assets/images/salon4.png',
    name: 'Martha Salon',
    address: '463 W Broadway, New York, NY 10012, United...',
    date: '05 Nov, 2020 - 10:00AM',
    rate: '5.0',
    km: '3.2km'
  }, {
    img: '../../assets/images/salon2.png',
    name: 'Central City Bright',
    address: '463 W Broadway, New York, NY 10012, United...',
    date: '07 Nov, 2020 - 07:00PM',
    rate: '5.0',
    km: '3.2km'
  },
  {
    img: '../../assets/images/salon5.png',
    name: 'Ozivia Salon',
    address: '463 W Broadway, New York, NY 10012, United...',
    date: '07 Nov, 2020 - 07:00PM',
    rate: '5.0',
    km: '3.2km'
  }]
  rate: any = 1;
  services: any = [{
    img: '../../assets/images/haircut.png',
    name: 'Hair Cutting',

  }, {
    img: '../../assets/images/color.png',
    name: 'Color Services',

  },
  {
    img: '../../assets/images/threading.png',
    name: 'Threading',

  },
  {
    img: '../../assets/images/massage.png',
    name: 'Hair Treatments',

  }, {
    img: '../../assets/images/hairtreatment.png',
    name: 'Hair treatment',

  }];
  salons: any = [{
    img: '../../assets/images/salon4.png',
    name: 'Martha Salon',
    address: '463 W Broadway, New York, NY 10012, United...',
    date: '05 Nov, 2020 - 10:00AM',
    rate: '5.0',
    km: '3.2km'
  }, {
    img: '../../assets/images/salon2.png',
    name: 'Central City Bright',
    address: '463 W Broadway, New York, NY 10012, United...',
    date: '07 Nov, 2020 - 07:00PM',
    rate: '5.0',
    km: '3.2km'
  },
  {
    img: '../../assets/images/salon5.png',
    name: 'Ozivia Salon',
    address: '463 W Broadway, New York, NY 10012, United...',
    date: '07 Nov, 2020 - 07:00PM',
    rate: '5.0',
    km: '3.2km'
  }]

  constructor(private nav: NavController, private modalCtrl: ModalController) {
  }
  async ngOnInit() 
  {
    try 
    {
      const response = await axios.get('http://157.230.232.108/salons');
      this.salons = response.data;
      console.log(response.data)
    } catch (error)
    {
     console.log(error.response);
    }

  }
  salonProfile(salon) {
    this.nav.navigateForward("/salon-profile");
  }
  setLocation() {
    this.nav.navigateForward('set-location')
  }
  async location() {
    const modal = await this.modalCtrl.create({
      component: LocationPage,
      cssClass: 'LocationPage',
    });
    return await modal.present();
  }
}
