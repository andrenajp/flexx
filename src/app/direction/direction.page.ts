import { Component, Input, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ModalController, NavController } from '@ionic/angular';
import axios from "axios"; 
declare var ol: any;

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
    private modal: ModalController,
    private geolocation:Geolocation
    ) {
  }
  back() {
    this.modal.dismiss()
  }
  async ngOnInit() 
  {
    this.geocode(this.salon.address);
    await this.geolocation.getCurrentPosition().then((resp) => {
      this.lat= resp.coords.latitude;
      this.long=resp.coords.longitude;
     }).catch((error) => {
       console.log('Error getting location', error);
     });

    setTimeout(() => {
      this.newMapFunction();
    }, 1000);

    this.drawDirection({lat:this.lat,long:this.long},{lat:this.latitude,long:this.longitude});
  }

  geocode(adrs)
  {
    axios.get('https://api-adresse.data.gouv.fr/search/?q='+adrs+"&limit=1").then(response => {
        this.longitude=response.data.features[0].geometry.coordinates[0];
        this.latitude=response.data.features[0].geometry.coordinates[1];
    });
  }

  setMapCenterLocation(long, lat) {
    var coord = this.getPointFromLongLat(long, lat);
    this.iconFeature2.getGeometry().setCoordinates(coord);
    this.map.getView().setCenter(coord);
    this.map.getView().setZoom(14);
  }
  getPointFromLongLat(long, lat) {
    return ol.proj.transform([long, lat], "EPSG:4326", "EPSG:3857");
  }
  newMapFunction()
  {
    this.iconFeature2 = new ol.Feature({
      geometry: new ol.geom.Point(
        ol.proj.fromLonLat([this.longitude, this.latitude])
      ),
      name: "Salon",
    });

    var moi = new ol.Feature({
      geometry: new ol.geom.Point(
        ol.proj.fromLonLat([this.long, this.lat])
      ),
      name: "Ma position",
    });

    const translate1 = new ol.interaction.Translate({
      features: new ol.Collection([this.iconFeature2,moi]),
    });

    // specific style for that one point
    this.iconFeature2.setStyle(
      new ol.style.Style({
        image: new ol.style.Icon({
          anchor: [0.5, 46],
          anchorXUnits: "fraction",
          anchorYUnits: "pixels",
          src: this.iconUrl,
        }),
      })
    );

    moi.setStyle(
      new ol.style.Style({
        image: new ol.style.Circle({
          radius: 10,
          fill: new ol.style.Fill({
            color: '#3399CC',
          }),
          stroke: new ol.style.Stroke({
            color: '#fff',
            width: 2,
          }),
        }),
      })
    );


    const iconLayerSource = new ol.source.Vector({
      features: [this.iconFeature2,moi],
    });
    const iconLayer = new ol.layer.Vector({
      source: iconLayerSource,
      // style for all elements on a layer
      style: new ol.style.Style({
        image: new ol.style.Icon({
          anchor: [0.5, 46],
          anchorXUnits: "fraction",
          anchorYUnits: "pixels",
          src:
            "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png",
        }),
      }),
    });
    this.map = new ol.Map({
      target: "map8",
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM(),
        }),
        iconLayer,
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([this.longitude, this.latitude]),
        zoom: 17,
      }),
    });



    /*
    this.map.addInteraction(translate1);
    translate1.on("translateend", (evt) => {
      var coords = ol.proj.toLonLat(evt.coordinate);
      this.latitude = coords[1];
      this.longitude = coords[0];
      // this.getAddress(this.latitude, this.longitude); 
    });
    */
    setTimeout(() => {
      this.map.updateSize();
    }, 500);
  }

  drawDirection(depart,fin)
  {
    
  }
}
