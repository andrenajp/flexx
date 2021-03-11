import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {

  @Input() filtre:any;
  rate: any = 3;
  servicesFor:any=["Homme & Femme","Homme","Femme"];
  serviceFor:string="";
  services:any;
  servicesSelect:any=[];
  sortBy:any;




  constructor(private modalctrl: ModalController) { }

  async ngOnInit()
  {
    if(this.filtre != null)
    {
      this.serviceFor=this.filtre.SF;
      this.rate=this.filtre.rate;
      this.sortBy=this.filtre.SB;
      this.servicesSelect=this.filtre.servicesSelect;
    }
    await axios.get('http://157.230.232.108/services/').then((res)=>{
      this.services=res.data;
    });
  }
  closeModal() 
  {
    this.modalctrl.dismiss(null,"cancel")
  }
  setRate(val) 
  {
    let rating = val;
    this.rate = rating;
  }

  async addServiceFiltre(id)
  {
    if(this.isServSelect(id))
    {
      const indexOf=this.servicesSelect.indexOf(id);
      await this.servicesSelect.splice(indexOf, 1);
    }
    else
      this.servicesSelect.push(id);

    console.log(this.servicesSelect)
  }

  isServSelect(service)
  {
    const indexOf=this.servicesSelect.indexOf(service);
    if (indexOf > -1)
      return true;
    else 
      return false;
  }

  setFiltre()
  {
    this.modalctrl.dismiss({"SB":this.sortBy,"SF":this.serviceFor,"servicesSelect":this.servicesSelect,"rate":this.rate },"Filtre");
  }
}
