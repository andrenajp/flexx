import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-services-modal',
  templateUrl: './services-modal.component.html',
  styleUrls: ['./services-modal.component.scss'],
})
export class ServicesModalComponent implements OnInit {
  @Input() serviceSelect:any;
  @Input() services:any;
  select:any=[];
  constructor(private modalCtrl:ModalController) { }

  ngOnInit()
  {
    for(var i in this.serviceSelect)
    {
      this.select[this.serviceSelect[i].id]=true;
    }
  }

  closeModal()
  {
    this.modalCtrl.dismiss(null,'cancel');
  }

  addServices()
  {
    this.modalCtrl.dismiss(this.select,'ajouter');
  }
}
