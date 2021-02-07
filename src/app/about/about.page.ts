import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  data: any = {};
  err: any = {}
  constructor(private nav: NavController) {

  }
  ngOnInit() {
  }
}
