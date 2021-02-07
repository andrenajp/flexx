import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
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
  latitude: number = 22.2868242;
  longitude: number = 70.7999889;
  lat: number = 22.2868242;
  long: number = 70.7999889;
  data: any;
  constructor(private nav: NavController, private modal: ModalController) {
  }
  back() {
    this.modal.dismiss()
  }
  ngOnInit() {
    setTimeout(() => {
      this.newMapFunction();
    }, 1000);
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
  newMapFunction() {
    this.iconFeature2 = new ol.Feature({
      geometry: new ol.geom.Point(
        ol.proj.fromLonLat([this.longitude, this.latitude])
      ),
      name: "Somewhere else",
    });
    const translate1 = new ol.interaction.Translate({
      features: new ol.Collection([this.iconFeature2]),
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
    const iconLayerSource = new ol.source.Vector({
      features: [this.iconFeature2],
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
        zoom: 8,
      }),
    });
    this.map.addInteraction(translate1);
    translate1.on("translateend", (evt) => {
      var coords = ol.proj.toLonLat(evt.coordinate);
      this.latitude = coords[1];
      this.longitude = coords[0];
      // this.getAddress(this.latitude, this.longitude); 
    });
    setTimeout(() => {
      this.map.updateSize();
    }, 500);
  }
}