import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-choose',
  templateUrl: './choose.page.html',
  styleUrls: ['./choose.page.scss'],
})
export class ChoosePage implements OnInit {

  sbSelected=false;
  SoB;
  sexe;


  constructor(
    public storage:Storage,
    private nav:NavController,
    private router:Router
    ) { }

  ngOnInit() {
  }

  async choose(ev: any)
  {
    this.SoB=await ev.detail.value;
    setInterval( ()=>{
      this.sbSelected=true;
    },500);

  }

  async chooseSexe(ev: any)
  {
    
    this.sexe=await ev.detail.value;
    this.router.navigate(['tabs/home'], {
      queryParams: { choose :true,SoB: this.SoB,sexe:this.sexe},
    });
  }
}
