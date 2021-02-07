import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {
  rate: any = 3;
  constructor(private modalctrl: ModalController) { }

  ngOnInit() {
  }
  closeModal() {
    this.modalctrl.dismiss()
  }
  setRate(val) {
    let rating = val;
    this.rate = rating;
  }
}
