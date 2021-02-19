import { Injectable } from '@angular/core';

import  axios  from 'axios';
import { BehaviorSubject, Observable, from, of, throwError } from "rxjs";
import {Storage} from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private readonly storage:Storage) { }

  getSalon(salon)
  {
    this.storage.set('appoint_salon',salon);
  }
  getEmp(emp)
  {
    this.storage.set('appoint_Emp',JSON.stringify(emp));

  }
  getdate(date)
  {
    this.storage.set('appoint_date',date);

  }
  setAppointment(salon,emp,date,s)
  {
    let idService=[];
    for (var i in s)
      idService.push({"id":s[i].id});
    
    axios
    .post('http://157.230.232.108/appointments', {
      appointment_date:date,
      salon: {"id":salon},
      employee: {"id":emp},
      services:idService
    })
    .then(response => {
      console.log(response);
    });
    this.storage.remove("appoint_salon");
    this.storage.remove("appoint_Emp");
    this.storage.remove("appoint_Emp");
    this.storage.remove("appoint_services");

  }
}
