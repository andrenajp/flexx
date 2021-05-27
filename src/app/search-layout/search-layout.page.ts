import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { FilterPage } from '../filter/filter.page';
import axios from 'axios';
import { Router,NavigationExtras} from '@angular/router';
import { DirectionPage } from '../direction/direction.page';
import { LocationPage } from '../location/location.page';
import { environment } from 'src/environments/environment.prod';



@Component({
  selector: 'app-search-layout',
  templateUrl: './search-layout.page.html',
  styleUrls: ['./search-layout.page.scss'],
})
export class SearchLayoutPage implements OnInit {
  url=environment.BASE_URL;
  salons:any=[];
  searchSalon: any = [ ]
  rate: any = 1;
  filtre:any=null;

  constructor(
    private nav: NavController, 
    private modal: ModalController,
     public router: Router
    ) { }

  async filter() 
  {
    const modal = await this.modal.create({
      component: FilterPage,
      cssClass: 'Filter_modal',
      componentProps:{"filtre":this.filtre}
    });
    await modal.present();
    const {data:s ,role} =await modal.onDidDismiss();
    if(role=="Filtre")
    {
      this.filtre=s;
      this.addFiltre();
    }
  }
  async ngOnInit() 
  {
      this.search("");
  }

  salonProfile(salon:NavigationExtras) {
    this.router.navigate(["/salon-profile"], {
      queryParams: salon,
    });
  }
  async location(salon) {
    const modal = await this.modal.create({
      component: LocationPage,
      cssClass: 'LocationPage',
      componentProps:{"salons" : this.searchSalon,"salon":salon }   
    });
    return await modal.present();
  }

  async search(s)
  {
    try
    {
      const response = await axios.get(this.url+'/salons?_where[address_contains]=%'+s+'%');
      this.searchSalon=response.data;

    }
    catch(error){console.log(error.response)}
  }

  async addFiltre()
  { 
    var filtreS="[services_in]=";
    for(var i=0;i<this.filtre.servicesSelect.length;i++)
    {
      if((this.filtre.servicesSelect.length-i) >1 )
        filtreS+=this.filtre.servicesSelect[i]+"&_where[services_in]=";
      else
        filtreS+=this.filtre.servicesSelect[i];

    }
    var clientèle;
    if(this.filtre.SF=="Homme & Femme")
      clientèle="Homme_Femme";
    else 
      clientèle=this.filtre.SF;

    const response = await axios.get(this.url+'/salons?_where'+filtreS+"&rate_gte="+this.filtre.rate+
    "&client_type="+clientèle);
    this.searchSalon=response.data;
  }
}
