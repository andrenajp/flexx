import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-open-with',
  templateUrl: './open-with.page.html',
  styleUrls: ['./open-with.page.scss'],
})
export class OpenWithPage implements OnInit {

  constructor(public mdlCtrl: ModalController) { }

  ngOnInit() {
  }

  async close()
  {
    return await this.mdlCtrl.dismiss(null,'cancel');
  }

}
