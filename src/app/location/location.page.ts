import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';

import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment.prod';
import { OpenWithPage } from '../open-with/open-with.page';
import axios from 'axios';

declare var ol: any;
@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {
  @Input () salon:any;
  @Input () salons:any;

  location: any = [ ];
  defaultSalon:any=[];
  map: any;
  iconFeature2;
  private geoCoder;
  public iconUrl = "../../../assets/images/pin.svg";
  star = 4;
  latitude: number;
  longitude: number;
  data: any;
  rate: any = 1;
  constructor(private modalCtrl: ModalController, public router: Router,private nav: NavController) { }
  back() {this.modalCtrl.dismiss()  }
  details(salon: NavigationExtras) 
  { 
    this.modalCtrl.dismiss()
    this.router.navigate(["/salon-profile"], {
      queryParams: salon,
    });
  }
  ngOnInit() 
  {
    const indexOf=this.salons.indexOf(this.salon);
    if (indexOf > -1) 
    {
      this.salons.splice(indexOf, 1);
      this.salons.splice(0,0,this.salon);
    }
    this.defaultSalon=this.salon;
    mapboxgl.accessToken =environment.mapboxKey;
    axios.get('https://api-adresse.data.gouv.fr/search/?q='+this.salon.address+"&limit=1").then(response => {
      this.longitude=response.data.features[0].geometry.coordinates[0];
      this.latitude=response.data.features[0].geometry.coordinates[1];
      this.drawMap();
    });

  }


  drawMap()
  {
    this.map = new mapboxgl.Map({
      container: 'map8',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.longitude, this.latitude], // starting position
      zoom: 18 // starting zoom
      });
      new mapboxgl.Marker({color:"red"}).setLngLat([this.longitude, this.latitude]).addTo(this.map);
  }

  getPos(event)
  {
    console.log("BOOOOOO")
  }
  async openWith()
  {
    const modal = await this.modalCtrl.create({
      component: OpenWithPage,
      cssClass: 'OpenWithPage'
    });
    return await modal.present();
  }
}
