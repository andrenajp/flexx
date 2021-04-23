import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-success',
  templateUrl: './success.page.html',
  styleUrls: ['./success.page.scss'],
})
export class SuccessPage implements OnInit {
  url=environment.BASE_URL;
  session_id:any;
  header={
    Authorization : 'Bearer '+ localStorage.getItem('access_token')
  };

  constructor(private acitveRoute: ActivatedRoute,
    private router:Router)
  {
    this.acitveRoute.queryParams.subscribe((res) => {
      this.session_id = res;
    });
  }

  ngOnInit() 
  {
    axios.post(this.url+'/orders/confirm',this.session_id,{headers: this.header});
    setTimeout(() => {
      this.router.navigate(['booking-success']);
  }, 5000);
  }

}
