import { Injectable } from '@angular/core';
import  axios  from 'axios';
import {Storage} from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly storage:Storage) { }


  async useLogin(login: any){
    await axios
    .post('http://157.230.232.108/auth/local', {
      identifier: login.email,
      password: login.password
    })
    .then((response) => {
      localStorage.setItem('access_token',response.data.jwt);
      localStorage.setItem('_user',JSON.stringify(response.data.user));

    })
    .catch((error) => {
      // Handle error.
      console.log('An error occurred:', error.response);
    });
   }
   
   isauthenticated()
   {
      if (localStorage.getItem('access_token')==null)
        return false;
      else
        return true;
   }

   logout()
   {
     localStorage.removeItem('access_token');
   }
   checkPassword(login) 
   {
      axios
      .post('http://157.230.232.108/auth/local', {
        identifier: login.email,
        password: login.password   
      })
   }

   async resetPassword(mail)
   {
     console.log(mail);
    await axios
    .post('http://157.230.232.108/auth/forgot-password', {
      email: mail 
    })
    .then(response => {
      console.log('Your user received an email');
    })
    .catch(error => {
      console.log('An error occurred:', error.response);
    });
   }
   
}
