import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  constructor(private nav: NavController) {

  }

  ngOnInit() {


  }
  makePayment() {

    this.nav.navigateForward('booking-success')
  }
  addNew() {
    this.nav.navigateForward('salon-profile');
  }
}
