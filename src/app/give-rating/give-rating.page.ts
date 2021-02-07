import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-give-rating',
  templateUrl: './give-rating.page.html',
  styleUrls: ['./give-rating.page.scss'],
})
export class GiveRatingPage implements OnInit {
  rate: any = 3;
  constructor(private modal: ModalController) { }

  ngOnInit() {
  }
  setRate(val) {
    let rating = val;
    this.rate = rating;
  }
  submit() {
    this.modal.dismiss();
  }
}
