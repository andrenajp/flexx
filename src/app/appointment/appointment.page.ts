import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { DirectionPage } from '../direction/direction.page';
import { GiveRatingPage } from '../give-rating/give-rating.page';
@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.page.html',
  styleUrls: ['./appointment.page.scss'],
})
export class AppointmentPage implements OnInit {
  selectAppointment = 'upcoming';
  rate: any = 1;
  upcoming: any = [{
    img: '../../assets/images/salon4.png',
    name: 'Martha Salon',
    address: '463 W Broadway, New York, NY 10012, United...',
    date: '15 Fev, 2021 - 10H00',
    rate: '5.0',
    km: '3.2km'
  }, {
    img: '../../assets/images/salon6.png',
    name: 'Central City Bright',
    address: '463 W Broadway, New York, NY 10012, United...',
    date: '17 Fev, 2021 - 17:00',
    rate: '5.0',
    km: '3.2km'
  }]
  past: any = [{
    img: '../../assets/images/salon2.png',
    name: 'Bright & Light',
    address: '463 W Broadway, New York, NY 10012, United...',
    date: '20 Oct, 2020 - 08H00',
    rate: '5.0',
    km: '3.2km'
  }, {
    img: '../../assets/images/salon9.png',
    name: 'Green Salon',
    address: '463 W Broadway, New York, NY 10012, United...',
    date: '19 Oct, 2020 - 08H00',
    rate: '5.0',
    km: '3.2km'
  }, {
    img: '../../assets/images/salon6.png',
    name: 'Central City Bright',
    address: '463 W Broadway, New York, NY 10012, United...',
    date: '17 Oct, 2020 - 17H00',
    rate: '5.0',
    km: '3.2km'
  }, {
    img: '../../assets/images/salon7.png',
    name: 'Beauty Plus',
    address: '463 W Broadway, New York, NY 10012, United...',
    date: '19 Oct, 2020 - 07H00',
    rate: '5.0',
    km: '3.2km'
  },]
  constructor(private modalCtrl: ModalController, private nav: NavController) { }
  ngOnInit() {
  }
  async rating() {
    const modal = await this.modalCtrl.create({
      component: GiveRatingPage,
      cssClass: 'giverate_modal',
    });
    return await modal.present();
  }
  async direction() {
    const modal = await this.modalCtrl.create({
      component: DirectionPage,
      cssClass: 'DirectionPage',
    });
    return await modal.present();
  }
  detail() {
    this.nav.navigateForward('appointment-detail')
  }
}
