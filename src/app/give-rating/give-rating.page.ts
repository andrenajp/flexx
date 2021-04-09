import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import axios from 'axios';
@Component({
  selector: 'app-give-rating',
  templateUrl: './give-rating.page.html',
  styleUrls: ['./give-rating.page.scss'],
})
export class GiveRatingPage implements OnInit {
  @Input() salon;
  rate: any = 3;
  comment:any;
  user=JSON.parse(localStorage.getItem('_user'));
  header={
    Authorization : 'Bearer '+ localStorage.getItem('access_token')
  };
  constructor(private modal: ModalController) { }

  async ngOnInit()
  {
  }
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
    await axios.post('http://157.230.232.108/reviews',data,{headers : this.header});
    console.log('Merci pour avoir donner votre avis')
    this.modal.dismiss();
  }
}
