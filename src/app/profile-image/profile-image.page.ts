import { Component, Input, OnInit } from '@angular/core';
import { Camera,CameraOptions} from '@ionic-native/camera/ngx';
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
  profileImg;
  @Input()user;
  header={
    'Authorization' : 'Bearer '+ localStorage.getItem('access_token'),
    'Content-Type': 'multipart/form-data'
  };
  constructor(
    private camera: Camera,
    public modal:ModalController
  ) { }

  ngOnInit() {
  }

  async getCamera()
  {

    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType:1,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum:false,
      correctOrientation:true
    }

    await this.camera.getPicture(options).then((imageData) => {
        console.log(imageData);
        this.uploadIMG(imageData);
        this.modal.dismiss(null);
     }).catch((error)=>{
       console.log(error.response)
      });

  }

  async getGallery()
  {
    await this.camera.getPicture({
      sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType:this.camera.DestinationType.DATA_URL
    }).then((imageData) => {
      const base64Image = 'data:image/jpeg;base64,' + imageData;
      console.log(base64Image)
      this.uploadIMG(base64Image);

      this.modal.dismiss(null);
     }).catch((error)=>{
       console.log(error);
      });


  }

  async uploadIMG(img)
  {
    var data={
      files:img,
      ref:'user',
      refId:this.user,
      field:'profile_img',
      source:'users-permissions'
    }
    var formData=new FormData();
      
    formData.append('files',img);
    formData.append('ref','user');
    formData.append('refId',this.user);
    formData.append('field','profile_img');
    formData.append('source','users-permissions');

    await axios.post(this.url+'/upload',formData,{headers: this.header})
    .then((response)=>{console.log(response)})
  }

}
 