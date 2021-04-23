import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.page.html',
  styleUrls: ['./cancel.page.scss'],
})
export class CancelPage implements OnInit {
  url=environment.BASE_URL;
  appoint_id:any;

  header={
    Authorization : 'Bearer '+ localStorage.getItem('access_token')
  };

  constructor(private acitveRoute: ActivatedRoute,
    private router:Router)
  {
    this.acitveRoute.queryParams.subscribe((res) => {
      this.appoint_id = res.id;
    });
  }

  ngOnInit() {
      axios.delete(this.url+'/appointments/'+this.appoint_id,{headers: this.header});
      setTimeout(() => {
        this.router.navigate(['tabs/home']);
    },5000);
  }
}
