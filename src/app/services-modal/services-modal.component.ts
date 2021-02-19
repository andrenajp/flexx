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

  ngOnInit() { }

  closeModal()
  {
    this.modalCtrl.dismiss(null,'cancel');
  }

  addServices()
  {
    this.modalCtrl.dismiss(this.select,'ajouter');
  }

  alreadySelect(id):boolean
  {
    for(var i in this.serviceSelect)
      if(this.serviceSelect[i].id==id)
        return true; 

    return false;
  }
}
