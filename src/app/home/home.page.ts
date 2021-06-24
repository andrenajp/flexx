import { Component } from "@angular/core";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { ModalController, NavController } from "@ionic/angular";
import { environment } from "src/environments/environment.prod";

import axios from "axios";

import { LocationPage } from "../location/location.page";
@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  base_url = environment.BASE_URL;

  select: string = "salon";
  nearbysalon: any = [];
  position: string = "";
  rate: any = 1;
  salons: any = [];
  barbers: any = [];
  SaB=true;
  SoB;
  sexe;
  constructor(
    private nav: NavController,
    private modalCtrl: ModalController,
    public router: Router,
    private route: ActivatedRoute,
    private geolocation: Geolocation
  ) {
    this.route.queryParams.subscribe((res) => {
      if (res.choose == "true")
      { 
        this.SaB = false;
        this.SoB = res.SoB;
        this.sexe = res.sexe;
      } 
    });

  }

  async ngOnInit() {
    if (!this.SaB) {
      if (this.SoB == "salon") {
        await axios
          .get(
            this.base_url +
              "/salons?_where[client_type_in]=Homme_Femme&_where[client_type_in]=" +
              this.sexe
          )
          .then((response) => {
            this.salons = response.data;
          });
      } else if (this.SoB == "barbeur") {
        this.select = "barber";
        await axios
          .get(
            this.base_url +
              "/barbers?_where[client_type_in]=Homme_Femme&_where[client_type_in]=" +
              this.sexe
          )
          .then((response) => {
            this.barbers = response.data;
          });
      }
    }else 
    {
      await axios.get(this.base_url + "/salons").then((response) => {
        this.salons = response.data;
      });
      await axios.get(this.base_url + "/barbers").then((response) => {
        this.barbers = response.data;
      });
    }
    this.geolocaliseMoi();
  
  }

  ngOnDestroy(){}
  ionViewWillEnter(){ }
  ionViewWillLeave()
  {
    this.ngOnDestroy();
  }

  salonProfile(salon: NavigationExtras) {
    this.nav.navigateRoot(["/salon-profile"], {
      queryParams: salon,
    })
  }
  setLocation() {
    this.nav.navigateForward("set-location");
  }
  async location() {
    const modal = await this.modalCtrl.create({
      component: LocationPage,
      cssClass: "LocationPage",
    });
    return await modal.present();
  }

  barbeurProfile(barbers: NavigationExtras) {
    this.nav.navigateRoot(["/barbeur-profile"], {
      queryParams: barbers,
    });
  }

  geolocaliseMoi() {
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        const lat = resp.coords.latitude;
        const long = resp.coords.longitude;
        axios
          .get(
            "https://api-adresse.data.gouv.fr/reverse/?lon=" +
              long +
              "&lat=" +
              lat
          )
          .then((response) => {
            this.position =
              response.data.features[0].properties.street +
              " , " +
              response.data.features[0].properties.city;
          });
      })
      .catch((error) => {
        console.log("Error getting location", error);
      });
  }

}
