import { Injectable } from '@angular/core';

import  axios  from 'axios';
import {Storage} from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private readonly storage:Storage) { }
  async sign(data: any)
  {
    await axios
    .post('http://157.230.232.108/auth/local/register', {
      username: data.surname,
      email: data.email,
      password: data.password,
      phone:data.phone,
      sexe:data.sexe
    })
    .then(response => {
      this.storage.set('access_token',response.data.jwt);
    })
    .catch(error => {
      // Handle error.
      console.log('An error occurred:', error.response);
    });
   }
}
