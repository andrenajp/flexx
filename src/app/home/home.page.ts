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
  services: any = []
  salons: any = [];

  constructor(private nav: NavController, private modalCtrl: ModalController, public router: Router)
  {
    console.log("Acceuil");
  }
  async ngOnInit() {
    try {
      const salonsRep = await axios.get('http://157.230.232.108/salons');
      this.salons = salonsRep.data;
      const serviceRep = await axios.get('http://157.230.232.108/services');
      this.services = serviceRep.data;
      console.log("Init Salon")

    } catch (error) {
      console.log(error.response);
    }
  }
  listeSalons(sercice: NavigationExtras) {
    this.router.navigate(["/select-service"], {
      queryParams: sercice,
    });
  }
  salonProfile(salon: NavigationExtras) {
    this.router.navigate(["/salon-profile"], {
      queryParams: salon,
    });
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
