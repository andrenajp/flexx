import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import * as moment from "moment";
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.page.html',
  styleUrls: ['./date-time.page.scss'],
})
export class DateTimePage implements OnInit {

  date: any=[];
  day:any;
  daySelect:any=null;
  type: 'string';

  constructor(
    private router: Router,
    public alrtCtrl: AlertController
  ) {

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
    moment.locale('fr');
  }
  onChange($event) {
    $event.preventdefault;
    this.daySelect=moment(this.date);
    this.day={'d':this.daySelect.format('dddd'),'affiche':this.daySelect.format('ddd D MMMM'),'date':this.daySelect.format()}
    ;

  }
  async continue() 
  {
    if(this.checkDdate())
      this.router.navigate(['hour'],{queryParams:this.day});
    else{
      const alert = await this.alrtCtrl.create({
        header: 'Date ??',
        message: 'Veuillez sélectionner une date ou une date différente d\'aujourd\'hui',
        buttons: [
          {
            text: 'OK',
            role:'cancel'
          }
        ],

      });
  
      await alert.present();
    }
  }

  checkDdate()
  {
    if (this.daySelect == null || moment().format("YYYY-MM-DD")== this.daySelect.format("YYYY-MM-DD"))
      return false;
    else
      return true;
  }
}
