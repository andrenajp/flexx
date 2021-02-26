import { Injectable } from '@angular/core';

import  axios  from 'axios';
import {Storage} from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private readonly storage:Storage) { }

  setAppointSalon(salon)
  {
    this.storage.set('appoint_salon',salon);
  }
  setAppointEmp(emp)
  {
    this.storage.set('appoint_Emp',JSON.stringify(emp));

  }
  setAppointDate(date)
  {
    this.storage.set('appoint_date',date);

  }
  setAppointService(serv)
  {
    this.storage.set('appoint_services',serv);

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
