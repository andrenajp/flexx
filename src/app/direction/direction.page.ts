import { Component, Input, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ModalController, NavController } from '@ionic/angular';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment.prod';
import axios from 'axios';
import { Platform } from '@ionic/angular';
import { OpenWithPage } from '../open-with/open-with.page';

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
    private modalctrl: ModalController,
    private geolocation:Geolocation
    ) {
  }
  back() 
  {
    this.modalctrl.dismiss()
  }
  async ngOnInit() 
  {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat=resp.coords.latitude
      this.long=resp.coords.longitude
     }).catch((error) => {
       console.log('Error getting location', error);
     });

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
      new mapboxgl.Marker({color:"red"}).setLngLat([this.longitude, this.latitude]).setPopup(new mapboxgl.Popup().setHTML("<h1>"+this.salon.name+"</h1>")).addTo(this.map);
      new mapboxgl.Marker({color:"blue"}).setLngLat([this.long, this.lat]).addTo(this.map);

      this.map.addControl(
        new mapboxgl.GeolocateControl({
        positionOptions: {
        enableHighAccuracy: true
        },
        trackUserLocation: true
        })
      );
      this.getRoute([this.longitude,this.latitude]);

  }


  // create a function to make a directions request
  getRoute(end) 
  {

    axios.get('https://api.mapbox.com/directions/v5/mapbox/cycling/' + this.long + ',' + this.lat + ';' + end[0] + ',' + end[1] + '?steps=true&geometries=geojson&access_token=' + mapboxgl.accessToken)
      .then((response)=>{ 
        
          if (this.map.getSource('route')) 
            this.map.getSource('route').setData(response.data.routes[0].geometry);
          else {
            this.map.addLayer({
                id: 'route',
                type: 'line',
                source: {
                  type: 'geojson',
                  data: {
                    type: 'Feature',
                    properties: {},
                    geometry: response.data.routes[0].geometry
                  }
                },
                layout: {
                  'line-join': 'round',
                  'line-cap': 'round'
                },
                paint: {
                  'line-color': '#3887be',
                  'line-width': 5,
                  'line-opacity': 0.75
                }
              });
            }
      });
      
  }

  async openWith()
  {
    const modal = await this.modalctrl.create({
      component: OpenWithPage,
      cssClass: 'OpenWithPage'
    });
    return await modal.present();
  }
  
}




