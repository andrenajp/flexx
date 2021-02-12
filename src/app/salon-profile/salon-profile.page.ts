import { Component, OnInit, ViewChild } from "@angular/core";
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  NavigationExtras,
  Router,
} from "@angular/router";
import { NavController } from "@ionic/angular";
import { Chart } from "chart.js";

import axios from 'axios';
import {AppointmentService} from '../Appointment/appointment.service';

@Component({
  selector: "app-salon-profile",
  templateUrl: "./salon-profile.page.html",
  styleUrls: ["./salon-profile.page.scss"],
})
export class SalonProfilePage implements OnInit {
  salon:any={};
  select = "service";
  changeIcon: string = "../../assets/images/down.svg";
  banner: any = [
    {
      img: "../../assets/images/salon4.png",
    },
    {
      img: "../../assets/images/salon5.png",
    },
    {
      img: "../../assets/images/salon8.png",
    },
    {
      img: "../../assets/images/salon9.png",
    },
  ];
  isShow: boolean;
  isColor: boolean;
  isfacial: boolean;
  hair = "../../assets/images/down.svg";
  colorChange = "../../assets/images/down.svg";
  facialChange = "../../assets/images/down.svg";
  fixSegment: any = 1;
  add = "../../assets/images/plus.svg";
  @ViewChild("barChart") barChart;
  constructor(
    private nav: NavController,
    private router: Router,
    private route: ActivatedRoute,
    private appointServ:AppointmentService
    ) {
      this.route.queryParams.subscribe((res) => {
        this.salon = res;
      }); 
    }
  bars: any;
  hairArray: any = [
    {
      price: "$200",
      name: "Smoothed Out Pixie",
    },
    {
      price: "$200",
      name: "Long Bob With Side Bangs",
    },
    {
      price: "$200",
      name: "Messy Wob",
    },
  ];
  review: any = [
    {
      img: "../../assets/images/profile.png",
      name: "Lisa Reaeldo",
      rate: "1.5",
      time: "15 Hours Ago.",
      desc:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the ",
    },
    {
      img: "../../assets/images/profile.png",
      name: "Mark Zing",
      rate: "1.5",
      time: "15 Hours Ago.",
      desc:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the ",
    },
    {
      img: "../../assets/images/profile.png",
      name: "Jems",
      rate: "1.5",
      time: "15 Hours Ago.",
      desc:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the ",
    },
    {
      img: "../../assets/images/profile.png",
      name: "Natasha",
      rate: "1.5",
      time: "15 Hours Ago.",
      desc:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the ",
    },
  ];

  createBarChart() {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: "bar",
      data: {
        labels: ["1", "2", "3", "4", "5"],
        datasets: [
          {
            data: [500, 400, 300, 200, 100],
            backgroundColor: "#F05860",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: false,
              },
            },
          ],
        },
      },
    });
  }
  ionViewDidEnter() {
    this.createBarChart();
  }
  service() {}

  async ngOnInit()
  {
    
    const idSalons =this.route.snapshot.paramMap.get("id");
    try 
    {
      const response = await axios.get('http://157.230.232.108/salons/'+idSalons);

    } catch (error)
    {
      console.log();
    }
  }
  ionViewWillEnter() {}
  continue() 
  {
    this.appointServ.getSalon(this.salon.id);
    this.router.navigate(["/select-employee"], {
      queryParams:{id:this.salon.id},
    });
  }
  back() {
    this.nav.navigateForward("tabs/home");
  }
  show() {
    this.isShow = !this.isShow;
    this.hair =
      this.hair === "../../assets/images/down.svg"
        ? "../../assets/images/up.svg"
        : "../../assets/images/down.svg";
  }
  color() {
    this.isColor = !this.isColor;
    this.colorChange =
      this.colorChange === "../../assets/images/down.svg"
        ? "../../assets/images/up.svg"
        : "../../assets/images/down.svg";
  }
  facial() {
    this.isfacial = !this.isfacial;
    this.facialChange =
      this.facialChange === "../../assets/images/down.svg"
        ? "../../assets/images/up.svg"
        : "../../assets/images/down.svg";
  }
  logScrolling(ev) {
    if (ev.detail.scrollTop >= 410) {
      this.fixSegment = 2;
    } else {
      this.fixSegment = 1;
    }
  }
}
