import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import * as moment from "moment";
import axios from 'axios';
import { AppointmentService } from '../Appointment/appointment.service';


@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.page.html',
  styleUrls: ['./date-time.page.scss'],
})
export class DateTimePage implements OnInit {
  idEmp;
  horaires;
  date: any;
  dateAff: any;
  type: 'string';
  dateRDV: Date;
  selectTime: any
  constructor(
    private nav: NavController,
    private route: ActivatedRoute,
    private router: Router,
    private appointServ: AppointmentService
  ) {
    this.route.queryParams.subscribe((res) => {
      this.idEmp = res;
    });
  }
  time: any = [
    {
      start_time: '9:00',
      hours: 9
    }, {
      start_time: '10:00',
      hours: 10
    }, {
      start_time: '11:00',
      hours: 11
    }, {
      start_time: '12:00',
      hours: 12
    }, {
      start_time: '13:00',
      hours: 13
    }, {
      start_time: '14:00',
      hours: 14
    }, {
      start_time: '15:00',
      hours: 15
    }, {
      start_time: '16:00',
      hours: 16
    }, {
      start_time: '17:00',
      hours: 17
    }, {
      start_time: '18:00',
      hours: 18
    }, {
      start_time: '19:00',
      hours: 19
    }]
  async ngOnInit() {
  }
  onChange($event) {
    $event.preventdefault;
    this.dateRDV = moment(this.date).toDate();
    this.dateAff = moment(this.dateRDV).toDate().toLocaleString('fr-FR');
  }
  activeSlot(i, h) {
    this.selectTime = i;
    //Ajouter l'heure à la date avec moment ?
    this.dateRDV = moment(this.dateRDV).hours(h).toDate();
    this.dateAff = moment(this.dateRDV).toDate().toLocaleString('fr-FR');
    console.log(this.dateAff)
  }
  continue() {
    this.appointServ.setAppointDate(this.dateRDV);
    this.nav.navigateForward('payment')
  }
}
