import { Component, OnInit } from "@angular/core";
import * as moment from "moment";
import {Storage} from '@ionic/storage';
import { AlertController, NavController } from "@ionic/angular";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-hour",
  templateUrl: "./hour.page.html",
  styleUrls: ["./hour.page.scss"],
})
export class HourPage implements OnInit {
  day:any;
  aff:any;
  date:any;
  selectTime: any;
  hours:any;
  morning: any = [
    {
      start_time: "07:00",
      hours: {hour:7,minutes:0},
    },
    {
      start_time: "07:30",
      hours: {hour:7,minutes:30},
    },
    {
      start_time: "08:00",
      hours: {hour:8,minutes:0},
    },
    {
      start_time: "08:30",
      hours: {hour:8,minutes:30},
    },
    {
      start_time: "09:00",
      hours: {hour:9,minutes:0},
    },
    {
      start_time: "09:30",
      hours: {hour:9,minutes:30},
    },
    {
      start_time: "10:00",
      hours: {hour:10,minutes:0},
    },
    {
      start_time: "10:30",
      hours: {hour:10,minutes:30},
    },
    {
      start_time: "11:00",
      hours:{hour:11,minutes:0},
    },
    {
      start_time: "11:30",
      hours: {hour:11,minutes:30},
    },
  ];

  afternoon: any = [
    {
      start_time: "12:00",
      hours: {hour:12,minutes:0},
    },
    {
      start_time: "12:30",
      hours: {hour:12,minutes:30},
    },
    {
      start_time: "13:00",
      hours: {hour:13,minutes:0},
    },
    {
      start_time: "13:30",
      hours: {hour:13,minutes:30},
    },
    {
      start_time: "14:00",
      hours: {hour:14,minutes:0},
    },
    {
      start_time: "14:30",
      hours: {hour:14,minutes:30},
    },
    {
      start_time: "15:00",
      hours: {hour:15,minutes:0},
    },
    {
      start_time: "15:30",
      hours: {hour:15,minutes:30},
    },
    {
      start_time: "16:00",
      hours: {hour:16,minutes:0},
    },
    {
      start_time: "16:30",
      hours: {hour:16,minutes:30},
    },
  ];

  evening: any = [
    {
      start_time: "17:00",
      hours: {hour:17,minutes:0},
    },
    {
      start_time: "17:30",
      hours: {hour:17,minutes:30},
    },
    {
      start_time: "18:00",
      hours: {hour:18,minutes:0},
    },
    {
      start_time: "18:30",
      hours: {hour:18,minutes:30},
    },
    {
      start_time: "19:00",
      hours: {hour:19,minutes:0},
    },
    {
      start_time: "19:30",
      hours: {hour:19,minutes:30},
    },
    {
      start_time: "20:00",
      hours: {hour:20,minutes:0},
    },
    {
      start_time: "20:30",
      hours: {hour:20,minutes:30},
    },
    {
      start_time: "21:00",
      hours: {hour:21,minutes:0},
    },
  ];

  constructor(
    public navCtrl: NavController,
    public route: ActivatedRoute,
    public storage: Storage,
    public alrtCtrl: AlertController
  ) 
  {
    this.route.queryParams.subscribe((res) => {
      this.day=res.d;
      this.aff=res.affiche;
      this.date=moment(res.date);
    });
  }

  ngOnInit() {}
  activeSlot(i,h) {
    this.selectTime = i;
    this.date=moment(this.date.format()).hour(h.hour).minute(h.minutes).second(0);
  }

  async continue()
  {
    if(this.selectTime){
    this.storage.set('appoint_date',this.date.toDate());
    this.navCtrl.navigateForward(['payment']);
    }
    else{

      const alert = await this.alrtCtrl.create({
        header: 'Heure ??',
        message: 'Veuillez sélectionner une heure ',
        buttons: [
          {
            text: 'OK',
            role:'Warning'
          }
        ],

      });
  
      await alert.present();
    }
  }
}
