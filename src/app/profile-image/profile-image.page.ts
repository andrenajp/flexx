import { Component, Input, OnInit } from '@angular/core';
import { Camera } from '@ionic-native/camera/ngx';
import { ModalController } from '@ionic/angular';

import axios from 'axios'; 
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-profile-image',
  templateUrl: './profile-image.page.html',
  styleUrls: ['./profile-image.page.scss'],
})
export class ProfileImagePage implements OnInit {
  url=environment.BASE_URL;
  @Input()user;
  header={
    Authorization : 'Bearer '+ localStorage.getItem('access_token')
  };
  constructor(
    private camera: Camera,
    public modal:ModalController
  ) { }

  ngOnInit() {
  }

  async getCamera()
  {
    this.camera.getPicture({
      sourceType:this.camera.PictureSourceType.CAMERA,
      destinationType:this.camera.DestinationType.DATA_URL
    }).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      axios.put(this.url+'/user/'+this.user,{profile_img:base64Image},{headers:this.header,}).then((response)=>{
        alert('fonctione')
      }).catch(error=>{console.log(error.response)})
      this.modal.dismiss(null);
     }).catch((error)=>{
       console.log(error.response)
      });
  }

  async getGallery()
  {
    this.camera.getPicture({
      sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType:this.camera.DestinationType.DATA_URL
    }).then((imageData) => {

      let base64Image = 'data:image/jpeg;base64,' + imageData;
      axios.put(this.url+'/user/'+this.user,{profile_img:base64Image},{headers:this.header,}).then((response)=>{
        alert('fonctione')
      }).catch(error=>{console.log(error.response)})
      this.modal.dismiss(null);

     }).catch((error)=>{
       console.log(error.response)
      });

  }

}
