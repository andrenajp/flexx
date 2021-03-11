import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ModalController, NavController } from '@ionic/angular';
import { environment } from 'src/environments/environment.prod';

import axios from 'axios';

import { LocationPage } from '../location/location.page';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  nearbysalon: any = [ ];
  position:string="";
  rate: any = 1;
  services: any = []
  salons: any = [];

  constructor(private nav: NavController, 
              private modalCtrl: ModalController,
              public router: Router,
              private geolocation:Geolocation
              ){  }

  async ngOnInit() 
  {
    try 
    {
      const salonsRep = await axios.get('http://157.230.232.108/salons');
      this.salons = salonsRep.data;
      const serviceRep = await axios.get('http://157.230.232.108/services');
      this.services = serviceRep.data;

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
  setLocation() 
  {
    this.nav.navigateForward('set-location')
    
  }
  async location() 
  {
    const modal = await this.modalCtrl.create({
      component: LocationPage,
      cssClass: 'LocationPage',
    });
    return await modal.present();
  }

  geolocaliseMoi()
  {
    this.geolocation.getCurrentPosition().then((resp) => {
      const lat=resp.coords.latitude;
      const long=resp.coords.longitude;
      axios.get('https://api-adresse.data.gouv.fr/reverse/?lon='+long+'&lat='+lat).then((response)=>{
        this.position=response.data.features[0].properties.street+" , "+response.data.features[0].properties.city;
      });
     }).catch((error) => {
       console.log('Error getting location', error);
     });
     
  }
}
