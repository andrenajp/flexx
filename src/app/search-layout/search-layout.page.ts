import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { FilterPage } from '../filter/filter.page';
import axios from 'axios';


@Component({
  selector: 'app-search-layout',
  templateUrl: './search-layout.page.html',
  styleUrls: ['./search-layout.page.scss'],
})
export class SearchLayoutPage implements OnInit {
  searchSalon: any = [{
    img: '../../assets/images/salon4.png',
    name: 'Martha Salon',
    address: '463 W Broadway, New York, NY 10012, United...',
    rate: '5.0',
    km: '3.2km'
  },
  {
    img: '../../assets/images/salon5.png',
    name: 'Ozivia Salon',
    address: '463 W Broadway, New York, NY 10012, United...',
    rate: '4.0',
    km: '5.2km'
  },
  {
    img: '../../assets/images/salon6.png',
    name: 'Central City Bright',
    address: '463 W Broadway, New York, NY 10012, United...',
    rate: '2.0',
    km: '3.2km'
  },
  {
    img: '../../assets/images/salon7.png',
    name: 'Beauty Plus',
    address: '463 W Broadway, New York, NY 10012, United...',
    rate: '4.0',
    km: '3.0km'
  },
  {
    img: '../../assets/images/salon8.png',
    name: 'Green Salon',
    address: '463 W Broadway, New York, NY 10012, United...',
    rate: '4.0',
    km: '3.2km'
  },
  {
    img: '../../assets/images/salon9.png',
    name: 'Bright & Light',
    address: '463 W Broadway, New York, NY 10012, United...',
    rate: '5.0',
    km: '1.2km'
  }]
  rate: any = 1;

  constructor(private nav: NavController, private modal: ModalController) { }

  async filter() {
    const modal = await this.modal.create({
      component: FilterPage,
      cssClass: 'Filter_modal',
    });
    return await modal.present();
  }
  async ngOnInit() 
  {
    try 
    {
      const response = await axios.get('http://157.230.232.108/salons');
     //this.searchSalon = response.data;
    } catch (error)
    {
     console.log("");
    }
  }

  salonProfile(salon) {
    this.nav.navigateForward("/salon-profile");
  }

}
