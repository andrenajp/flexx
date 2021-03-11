import { Component, Input, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ModalController, NavController } from '@ionic/angular';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment.prod';
import axios from 'axios';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-direction',
  templateUrl: './direction.page.html',
  styleUrls: ['./direction.page.scss'],
})
export class DirectionPage implements OnInit {

  map: any;
  iconFeature2;
  rate: any = 1;
  private geoCoder;
  public iconUrl = "../../../assets/images/pin.svg";
  star = 4;
  latitude: number; 
  longitude: number;
  lat: number;
  long: number;
  data: any;
  @Input() salon;
  @Input() pathBack;
  constructor(
    private nav: NavController,
    private platform: Platform,
    private modal: ModalController,
    private geolocation:Geolocation
    ) {
  }
  back() 
  {
    this.modal.dismiss()
  }
  async ngOnInit() 
  {
    mapboxgl.accessToken =environment.mapboxKey;
    axios.get('https://api-adresse.data.gouv.fr/search/?q='+this.salon.address+"&limit=1").then(response => {
      this.longitude=response.data.features[0].geometry.coordinates[0];
      this.latitude=response.data.features[0].geometry.coordinates[1];
      this.drawMap();
  });

  }

  
  getItinéraire()
  {
    if(this.platform.is("android"))
    {

    }
    else if(this.platform.is("ios"))
    {
      
    }
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
      this.map.addControl(
        new mapboxgl.GeolocateControl({
        positionOptions: {
        enableHighAccuracy: true
        },
        trackUserLocation: true
        })
        );
  }
}
