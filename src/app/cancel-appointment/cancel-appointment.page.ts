import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cancel-appointment',
  templateUrl: './cancel-appointment.page.html',
  styleUrls: ['./cancel-appointment.page.scss'],
})
export class CancelAppointmentPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['tabs/appointment']);
  }, 5000);
  }

}
