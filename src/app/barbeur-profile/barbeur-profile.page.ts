import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NavController } from "@ionic/angular";
import axios from "axios";
import { AlertController } from "@ionic/angular";
import { environment } from "src/environments/environment.prod";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-barbeur-profile",
  templateUrl: "./barbeur-profile.page.html",
  styleUrls: ["./barbeur-profile.page.scss"],
})
export class BarbeurProfilePage implements OnInit {
  url = environment.BASE_URL;
  barber: any = [];
  services: any = [];
  logo: any;
  slider: any;
  servicesSelect: any = [];
  address: any = null;
  fixSegment: any = 1;
  select = "service";

  serviceSlide = {
    slidesPerView: 3,
  };

  constructor(
    private nav: NavController,
    private readonly storage: Storage,
    private router: Router,
    private route: ActivatedRoute,
    public alertController: AlertController
  ) {
    this.route.queryParams.subscribe((res) => {
      this.barber = res;
    });
  }

  ngOnInit() {
    this.storage.clear();
    axios.get(this.url + "/barbers/" + this.barber.id).then((response) => {
      this.services = response.data.services;
      this.logo = response.data.logo;
      this.slider = response.data.slider;
    });

    const user = JSON.parse(localStorage.getItem("_user"));
    if (user != null) if (user.address != null) this.address = user.address;
  }
  back() {
    this.nav.navigateRoot('tabs/home',{replaceUrl:true});
  }
  logScrolling(ev) {
    if (ev.detail.scrollTop >= 410) {
      this.fixSegment = 2;
    } else {
      this.fixSegment = 1;
    }
  }

  async reserver() {
    if (this.servicesSelect.length === 0 || this.address === null) {
      const alert = await this.alertController.create({
        header: "Élément(s) manquant(s) ?",
        message:
          "Veuillez sélectionner un (ou plusieurs) service(s) et indiquer l' adresse pour pouvoir prendre un rendez-vous",
        buttons: ["OK"],
      });

      await alert.present();
    } else {
      this.storage.set("typeRDV", "Barber");
      this.storage.set("appoint_barber", this.barber);
      this.storage.set("appoint_address", this.address);
      this.storage.set("appoint_services", this.servicesSelect);
      this.nav.navigateForward(['day']);
    }
  }

  async addService(service) {
    const indexOf = this.servicesSelect.indexOf(service);
    if (indexOf > -1) await this.servicesSelect.splice(indexOf, 1);
    else await this.servicesSelect.push(service);
  }

  isServSelect(service) {
    const indexOf = this.servicesSelect.indexOf(service);
    if (indexOf > -1) return true;
    else return false;
  }

  async chat(){
    this.nav.navigateForward(['chat']);
  
  }
}
