import { Component, OnInit, ViewChild } from "@angular/core";
import {  ActivatedRoute,Router,} from "@angular/router";
import { NavController } from "@ionic/angular";
import axios from 'axios';
import { AlertController } from '@ionic/angular';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-barbeur-profile',
  templateUrl: './barbeur-profile.page.html',
  styleUrls: ['./barbeur-profile.page.scss'],
})
export class BarbeurProfilePage implements OnInit {
  url=environment.BASE_URL;
  barbeur: any = [];
  services:any=[];
  logo:any;
  servicesSelect:any=[];
  address:any=null;

  serviceSlide = {
    slidesPerView: 3
  }

  constructor(
    private nav: NavController,
    private router: Router,
    private route: ActivatedRoute,
    public alertController: AlertController
  )
  {
    this.route.queryParams.subscribe((res) => {
      this.barbeur = res;
    });
  }

  ngOnInit() 
  {
    axios.get(this.url+'barbeurs/'+this.barbeur.id).then((response)=>{
      this.services=response.data.services
    });
    
  }
  back() 
  {
    this.nav.navigateForward("tabs/home");
  }
  async reserver()
  {
    if(this.servicesSelect.length === 0 || this.address===null)
    {
      const alert = await this.alertController.create({
        header: 'Élément(s) manquant(s) ?',
        message: 'Veuillez sélectionner un (ou plusieurs) service(s) et indiquer l\' adresse pour pouvoir prendre un rendez-vous',
        buttons: ['OK']
      });
  
      await alert.present();
    }
    else
    {   
      console.log("fonctionne " + this.address)
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
