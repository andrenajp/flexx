import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.page.html',
  styleUrls: ['./first-page.page.scss'],
})
export class FirstPagePage implements OnInit {

  constructor(public navCtrl:NavController) { 
    if(localStorage.getItem('_user'))
    this.navCtrl.navigateForward(['choose']);
  }

  ngOnInit() {
    
  }

  login()
  {
    this.navCtrl.navigateForward(['login']);
  }

  continuer()
  {
    this.navCtrl.navigateForward(['choose']);
  }

}
