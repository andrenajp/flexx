import { Component, OnInit } from '@angular/core';
import * as moment from "moment";
import {Storage} from '@ionic/storage';
import { NavController, NavParams } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-day',
  templateUrl: './day.page.html',
  styleUrls: ['./day.page.scss'],
})
export class DayPage implements OnInit {

  days=[];
  day:any=[];
  constructor(
    public navctrl: NavController,
    public router: Router

  ) 
  {
  }

  ngOnInit() {
    moment.locale('fr');
    var d = moment().add(1,'d');
    
    for (var i=0;i<7; i++)
    {
      this.days.push({'d':d.format('dddd'),'affiche':d.format('ddd D MMMM'),'date':d.format()});
      d.add(1,'d');
    }
  }


  setDay(day)
  {
    // this.navctrl.navigateForward(['hour'],{queryParams:day});
    this.router.navigate(['hour'],{queryParams:day});
  }
  otherDate()
  {
    this.router.navigate(['date-time']);

  }
}
