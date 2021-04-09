import { Component, OnInit, ViewChild } from "@angular/core";
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  NavigationExtras,
  Router,
} from "@angular/router";
import { NavController } from "@ionic/angular";
import { Chart } from "chart.js";

import axios from 'axios';
import { AlertController } from '@ionic/angular';
import {Storage} from '@ionic/storage';

@Component({
  selector: "app-salon-profile",
  templateUrl: "./salon-profile.page.html",
  styleUrls: ["./salon-profile.page.scss"],
})
export class SalonProfilePage implements OnInit {
  salon: any = [];
  reviews:any=[];
  employee:any=[];
  services:any=[];
  select = "service";
  changeIcon: string = "../../assets/images/down.svg";
  banner: any = [ ];
  isShow: boolean;
  isColor: boolean;
  isfacial: boolean;
  hair = "../../assets/images/down.svg";
  colorChange = "../../assets/images/down.svg";
  facialChange = "../../assets/images/down.svg";
  fixSegment: any = 1;
  add = "../../assets/images/plus.svg";
  logo;
  empSelect:any;
  servicesSelect:any=[];
  thesalon;

  @ViewChild("barChart") barChart;
  constructor(
    private nav: NavController,
    private router: Router,
    private route: ActivatedRoute,
    public alertController: AlertController,
    private readonly storage:Storage
  ) {
    this.route.queryParams.subscribe((res) => {
      this.salon = res;
    });
  }
  bars: any;
  hairArray: any = [
    {
      price: "$200",
      name: "Smoothed Out Pixie",
    },
    {
      price: "$200",
      name: "Long Bob With Side Bangs",
    },
    {
      price: "$200",
      name: "Messy Wob",
    },
  ];

  serviceSlide = {
    slidesPerView: 3
  }

  async ngOnInit() 
  {
    await axios.get('http://157.230.232.108/salons/'+this.salon.id).then((res)=>{
      this.thesalon = res.data
      this.employee=res.data.employees;
      this.services=res.data.services;
      this.logo=res.data.Logo;
      this.reviews=res.data.reviews;
      console.log(this.reviews)

    });


  }

  ionViewWillEnter() { }


  async reserver()
  {
    if(localStorage.getItem('access_token') == null)
    {
      const alert = await this.alertController.create({
        header: 'Login ??',
        message: 'Vous devez être connecter pour prendre un rendez-vous',
        buttons: [
          {
            text: 'Se connecter',
            role: 'login',
            handler: (blah) => {
              this.nav.navigateForward('login');
            }
          }, {
            text: 'Anuller',
            role:'cancel',
            handler: () => {
              console.log('Cancel');
            }
          }
        ],

      });
  
      await alert.present();
    }
    else if(this.empSelect==undefined || this.servicesSelect.length == 0)
    {
      const alert = await this.alertController.create({
        header: 'Élément(s) manquant(s) ?',
        message: 'Veuillez sélectionner un (ou plusieurs) service(s) et un(e) employé(e) pour pouvoir prendre un rendez-vous',
        buttons: ['OK']
      });
  
      await alert.present();
    }
    else
    {   
      this.storage.set('appoint_salon',this.salon);
      this.storage.set('appoint_Emp',JSON.stringify(this.empSelect));
      this.storage.set('appoint_services',this.servicesSelect);

      this.router.navigate(["/date-time"], {
        queryParams: { 
          employee:JSON.stringify(this.empSelect)
        },
      });
    }
  }

  back() {
    this.nav.navigateForward("tabs/home");
  }


  show() {
    this.isShow = !this.isShow;
    this.hair =
      this.hair === "../../assets/images/down.svg"
        ? "../../assets/images/up.svg"
        : "../../assets/images/down.svg";
  }
  color() {
    this.isColor = !this.isColor;
    this.colorChange =
      this.colorChange === "../../assets/images/down.svg"
        ? "../../assets/images/up.svg"
        : "../../assets/images/down.svg";
  }
  facial() {
    this.isfacial = !this.isfacial;
    this.facialChange =
      this.facialChange === "../../assets/images/down.svg"
        ? "../../assets/images/up.svg"
        : "../../assets/images/down.svg";
  }
  logScrolling(ev) {
    if (ev.detail.scrollTop >= 410) {
      this.fixSegment = 2;
    } else {
      this.fixSegment = 1;
    }
  }

  async addService(service)
  {
    const indexOf=this.servicesSelect.indexOf(service);
    if (indexOf > -1)
      await this.servicesSelect.splice(indexOf, 1);
    else   
      await this.servicesSelect.push(service);
  }

  selectEmp(emp)
  {
    this.empSelect=emp;
  }
  isServSelect(service)
  {
    const indexOf=this.servicesSelect.indexOf(service);
    if (indexOf > -1)
      return true;
    else 
      return false;
  }

  
  async call()
  {

    const alert = await this.alertController.create({
      header: 'Numéro whatsapp',
      inputs: [
        {
          name: 'name1',
          type: 'text',
          value: '+594694012345'
        }, 
      ],
      buttons: [
        {
          text:'Ajouter',
          role:'add',
          handler:()=>{
              console.log("rien")
          }
        },
        {
          text:'Annuler',
          role:'cancel',
          handler:()=>{
            
          }
        }]
    });
    await alert.present();
  }
}
