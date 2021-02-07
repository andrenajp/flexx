import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import * as moment from "moment";

@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.page.html',
  styleUrls: ['./date-time.page.scss'],
})
export class DateTimePage implements OnInit {
  date: any;
  type: 'string';
  selectTime: any
  constructor(private nav: NavController) { }
  time: any = [
    {
      start_time: '10:00 PM'
    }, {
      start_time: '10:00 PM'
    }, {
      start_time: '10:00 PM'
    }, {
      start_time: '10:00 PM'
    }, {
      start_time: '10:00 PM'
    }, {
      start_time: '10:00 PM'
    }, {
      start_time: '10:00 PM'
    }, {
      start_time: '10:00 PM'
    }, {
      start_time: '10:00 PM'
    }, {
      start_time: '10:00 PM'
    }, {
      start_time: '10:00 PM'
    }, {
      start_time: '10:00 PM'
    }, {
      start_time: '10:00 PM'
    }, {
      start_time: '10:00 PM'
    }, {
      start_time: '10:00 PM'
    }, {
      start_time: '10:00 PM'
    }, {
      start_time: '10:00 PM'
    }]
  ngOnInit() {
  }
  onChange($event) {

  }
  activeSlot(i) {
    this.selectTime = i;

  }
  continue() {
    this.nav.navigateForward('select-employee')
  }
}
