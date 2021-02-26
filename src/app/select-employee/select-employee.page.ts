import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NavigationExtras, ActivatedRoute,Router } from '@angular/router';
import axios from 'axios';

import {AppointmentService} from '../Appointment/appointment.service';


@Component({
  selector: 'app-select-employee',
  templateUrl: './select-employee.page.html',
  styleUrls: ['./select-employee.page.scss'],
})
export class SelectEmployeePage implements OnInit {
  idSalon;
  employee: any = [];
  check = '../../assets/images/check.svg';
  selectEmp: any
  constructor(
    private nav: NavController,
    private route: ActivatedRoute,
    private router:Router,
    private appointServ:AppointmentService
    )
    { 
      this.route.queryParams.subscribe((res) => {
        this.idSalon = res.id;
      }); 
    }
  async ngOnInit() 
  {

    try 
    {
      const response = await axios.get('http://157.230.232.108/salons/'+this.idSalon);
      this.employee = response.data.employees;
    } catch (error)
    {
      console.log(error.response);
    }     
  }
  schedule() 
  {
    this.appointServ.setAppointEmp(this.selectEmp);
    this.router.navigate(["/date-time"], {
      queryParams:{id:this.selectEmp.id},
    });
    //this.nav.navigateForward('payment')
  }
  change() {

  }
  employ(emp)
  {
    this.selectEmp=emp;
  }
}
