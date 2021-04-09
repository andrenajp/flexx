import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  url=environment.BASE_URL;
  constructor() 
  { }

  makeSalonAppointment(salon,service,hour,Employe)
  {

  }

  makeBarberAppointment(barber,address)
  {
    
  }
}
