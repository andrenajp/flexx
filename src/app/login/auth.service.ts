import { Injectable } from '@angular/core';
import  axios  from 'axios';

import { BehaviorSubject, Observable, from, of, throwError } from "rxjs";
import {Storage} from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly storage:Storage) { }


  useLogin(login: any): Observable<boolean> {
    axios
    .post('http://157.230.232.108/auth/local', {
      identifier: login.email,
      password: login.password,
    })
    .then(response => {
      this.storage.set('access_token',response.data.jwt);
      return true;
    })
    .catch(error => {
      // Handle error.
      console.log('An error occurred:', error.response);
    });
    return of(true);
   }
}
