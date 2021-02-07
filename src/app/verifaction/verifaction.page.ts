import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-verifaction',
  templateUrl: './verifaction.page.html',
  styleUrls: ['./verifaction.page.scss'],
})
export class VerifactionPage implements OnInit {
  @ViewChild("a", { static: true }) a;
  @ViewChild("b", { static: true }) b;
  @ViewChild("c", { static: true }) c;
  @ViewChild("d", { static: true }) d;
  otp: any = {};
  constructor(private nav: NavController) { }

  ngOnInit() {
  }
  moveFocus(event, nextElement, previousElement) {
    if (event.keyCode == 8 && previousElement) {
      previousElement.setFocus();
    } else if (event.keyCode >= 48 && event.keyCode <= 57) {
      if (nextElement) {
        nextElement.setFocus();
      }
    } else {
      event.path[0].value = "";
    }
  }
  ionViewWillEnter() {
    setTimeout(() => {
      this.a.setFocus();
    }, 150);
  }
  continue() {

    this.nav.navigateForward('tabs/home');

  }

}
