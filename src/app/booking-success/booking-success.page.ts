import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
@Component({
  selector: 'app-booking-success',
  templateUrl: './booking-success.page.html',
  styleUrls: ['./booking-success.page.scss'],
})
export class BookingSuccessPage implements OnInit {
  constructor(
    private nav: NavController,
    private platform: Platform
    )
  { 
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.nav.navigateForward('tabs/home');
    
    });
  }
  ngOnInit() {
  }
  gotoHome() {
    this.nav.navigateForward('tabs/home');
  }
  seeBooking() {
    this.nav.navigateForward('tabs/appointment');
  }
}
