import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { FilterPage } from '../filter/filter.page';
import axios from 'axios';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-select-service',
  templateUrl: './select-service.page.html',
  styleUrls: ['./select-service.page.scss'],
})
export class SelectServicePage implements OnInit {
  service;
  searchSalon: any = [];

  constructor(private nav: NavController, private modal: ModalController,private route: ActivatedRoute) 
  {   
    this.route.queryParams.subscribe((res) => {
    this.service = res;
  }); }

  async ngOnInit() {


    try 
    {
      const response = await axios.get('http://157.230.232.108/services/'+this.service.id);
      this.searchSalon=response.data.salons;
      console.log(this.searchSalon)
    } catch (error)
    {
     console.log(error.response);
    }
  }

  salonProfile(salon) {
    this.nav.navigateForward("/salon-profile");
  }
}
