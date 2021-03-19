import { Injectable } from '@angular/core';

import  axios  from 'axios';
import {Storage} from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private readonly storage:Storage) { }
  
  setAppointment(salon,emp,date,s)
  {
    let idService=[];
    for (var i in s)
      idService.push({"id":s[i].id});
    
    try
    {
      axios.post('http://157.230.232.108/appointments', {
        appointment_date:date,
        salon: {"id":salon},
        employee: {"id":emp},
        services:idService
      });
      this.storage.remove("appoint_salon");
      this.storage.remove("appoint_Emp");
      this.storage.remove("appoint_Emp");
      this.storage.remove("appoint_services");
    }catch(error){console.log(error.response)}


  }
}
