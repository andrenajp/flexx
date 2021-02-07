import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-booking-success',
  templateUrl: './booking-success.page.html',
  styleUrls: ['./booking-success.page.scss'],
})
export class BookingSuccessPage implements OnInit {
  constructor(private nav: NavController) { }
  ngOnInit() {
  }
  gotoHome() {
    this.nav.navigateForward('tabs/home')
  }
  seeBooking() {
    this.nav.navigateForward('tabs/appointment');
  }
}
