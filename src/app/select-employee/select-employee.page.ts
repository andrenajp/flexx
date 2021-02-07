import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-select-employee',
  templateUrl: './select-employee.page.html',
  styleUrls: ['./select-employee.page.scss'],
})
export class SelectEmployeePage implements OnInit {
  employee: any = [];
  check = '../../assets/images/check.svg';
  selectEmp: any
  constructor(private nav: NavController) { }
  ngOnInit() {

  }
  payment() {

    this.nav.navigateForward('payment')
  }
  change() {

  }
  employ(emp) {



  }
}
