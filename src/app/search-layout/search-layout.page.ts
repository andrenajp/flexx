import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { FilterPage } from '../filter/filter.page';
import axios from 'axios';
import { Router,NavigationExtras} from '@angular/router';


@Component({
  selector: 'app-search-layout',
  templateUrl: './search-layout.page.html',
  styleUrls: ['./search-layout.page.scss'],
})
export class SearchLayoutPage implements OnInit {
  searchSalon: any = [ ]
  rate: any = 1;

  constructor(
    private nav: NavController, 
    private modal: ModalController,
     public router: Router
    ) { }

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
     this.searchSalon = response.data;
    } catch (error)
    {
     console.log("");
    }
  }

  salonProfile(salon:NavigationExtras) {
    this.router.navigate(["/salon-profile"], {
      queryParams: salon,
    });
  }

}
