import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import axios from 'axios';
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-give-rating',
  templateUrl: './give-rating.page.html',
  styleUrls: ['./give-rating.page.scss'],
})
export class GiveRatingPage implements OnInit {
  @Input() salon;
  @Input() appoint;
  url=environment.BASE_URL;
  rate: any = 3;
  comment:any;
  user=JSON.parse(localStorage.getItem('_user'));
  header={
    Authorization : 'Bearer '+ localStorage.getItem('access_token')
  };
  constructor(private modal: ModalController) { }

  async ngOnInit()
  {  }
  setRate(val) {
    let rating = val;
    this.rate = rating;
  }
  async submit()
  {
    const dateComment=new Date();
    const data={
      content: this.comment,
      user: this.user.username,
      salon: this.salon,
      rate: this.rate,
      date: dateComment
    };
    await axios.post(this.url+'/reviews',data,{headers : this.header});
    await axios.put(this.url+'/appointments/'+this.appoint,{alreadyGiveReview: true,rate:this.rate},{headers : this.header});
    this.modal.dismiss();
  }
}
