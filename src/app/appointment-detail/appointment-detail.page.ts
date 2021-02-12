import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

import axios from 'axios';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-appointment-detail',
  templateUrl: './appointment-detail.page.html',
  styleUrls: ['./appointment-detail.page.scss'],
})
export class AppointmentDetailPage implements OnInit {
  appointment:any={};
  salon:any={};
  emp:any={};
  service:any={};
  constructor(
    private nav: NavController, 
    private modal: ModalController,
    private route: ActivatedRoute
  ) 
  {

    
  }

  ngOnInit() 
  {
    this.route.queryParams.subscribe((res) => {
      const idA = res.id;
      axios.get('http://157.230.232.108/appointments/'+idA).then(response => {
        this.appointment=response.data;
        this.salon=response.data.salon;
        this.emp=response.data.employee;
      });
    }); 
  }

  cancel()
  {
    
  }

}
