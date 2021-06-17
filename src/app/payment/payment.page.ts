import { Component, OnInit } from "@angular/core";
import { AlertController, NavController } from "@ionic/angular";

import axios from "axios";
import { Storage } from "@ionic/storage";

import { ModalController } from "@ionic/angular";
import { environment } from "src/environments/environment.prod";

import { StripeComponent } from "../stripe/stripe.component";
import { loadStripe } from "@stripe/stripe-js";
@Component({
  selector: "app-payment",
  templateUrl: "./payment.page.html",
  styleUrls: ["./payment.page.scss"],
})
export class PaymentPage implements OnInit {
  stripeKey = environment.stripeToken;
  url = environment.BASE_URL;
  AppointType: any;
  salon: any = {};
  barber: any = {};
  emp: any = {};
  serviceSelect: any = [];
  address: any;
  date: Date;
  price: number = 0;
  serviceCharge: number = 5;
  totalPrice: number = 0;
  payment: any = [
    {
      name: "Stripe",
      icon: "../../assets/images/stripe.svg",
    },
    {
      name: "Espèce",
      icon: "../../assets/images/cod.svg",
    },
  ];
  paymentWith: any = "Stripe";

  header = {
    Authorization: "Bearer " + localStorage.getItem("access_token"),
  };
  user = JSON.parse(localStorage.getItem("_user"));
  pay = false;
  promoCode:string;
  goodPromoCode:boolean;
  errorPromoCode:any;
  amountPromo:number;
  constructor(
    private nav: NavController,
    private readonly storage: Storage,
    public modalCtrl: ModalController,
    public alrtCtrl: AlertController
  ) {}

  ngOnInit() {
    this.storage.get("typeRDV").then((value) => {
      this.AppointType = value;
      if (this.AppointType == "Salon") {
        this.storage.get("appoint_salon").then((res) => {
          axios.get(this.url + "/salons/" + res.id).then((response) => {
            this.salon = response.data;
          });
        });
        this.storage.get("appoint_Emp").then((val) => {
          this.emp = JSON.parse(val);
        });
      } else if (this.AppointType == "Barber") {
        this.storage.get("appoint_address").then((val) => {
          this.address = val;
        });
        this.storage.get("appoint_barber").then((val) => {
          this.barber = val;
        });
      }
    });

    this.storage.get("appoint_services").then((val) => {
      this.serviceSelect = val;
      for (var i in this.serviceSelect)
        this.price = Number(this.price) + Number(this.serviceSelect[i].price);
      this.totalPrice = Number(this.price) + Number(this.serviceCharge);
    });
    this.storage.get("appoint_date").then((val) => {
      this.date = val;
    });
  }
  async makePayment() {
    if(localStorage.getItem('access_token') == null)
    {
      const alert = await this.alrtCtrl.create({
        header: 'Utilisateur ??',
        message: 'Vous devez être connecter pour prendre un rendez-vous',
        buttons: [
          {
            text: 'Se connecter',
            role: 'login',
            handler: (blah) => {
              this.nav.navigateForward(['login']);
            }
          }, {
            text: 'Anuller',
            role:'cancel',
            handler: () => {
              console.log('Cancel');
            }
          }
        ],

      });
  
      await alert.present();
    }
    else if (this.AppointType == "Salon")
      this.setSalonAppointment(
        this.salon.id,
        this.emp.id,
        this.date,
        this.serviceSelect
      );
    else if (this.AppointType == "Barber")
      this.setBarberAppointment(this.serviceSelect, this.date);
  }

  setSalonAppointment(salon, employee, date, services) {
    let idService = [];
    for (var i in services) idService.push({ id: services[i].id });

    axios
      .post(
        this.url + "/appointments",
        {
          user: this.user.id,
          employee: { id: employee },
          services: idService,
          status: "upcoming",
          type: "salon",
          day: date,
          price: this.totalPrice,
          salon: { id: salon },
        },
        { headers: this.header }
      )
      .then((response) => {
        const data = response.data;
        console.log("passer ICI set 1");

        if (this.paymentWith == "Stripe") this.payWithStripe(data.id);
      });
  }

  setBarberAppointment(services, date) {
    let idService = [];
    for (var i in services) idService.push({ id: services[i].id });

    axios
      .post(
        this.url + "/appointments",
        {
          user: this.user.id,
          services: idService,
          status: "upcoming",
          type: "salon",
          day: date,
          price: this.totalPrice,
          barber: this.barber,
        },
        { headers: this.header }
      )
      .then((response) => {
        const data = response.data;
        if (this.paymentWith == "Stripe") this.payWithStripe(data.id);

      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  async payWithStripe(appointment) {
    const order = {
      appointment: { id: appointment },
    };
    var clientSecret;
    var orderID;
    await axios
      .post(this.url + "/orders", order, { headers: this.header })
      .then((response) => {
        clientSecret = response.data.secret;
        orderID=response.data.order;
      });
    const modal = await this.modalCtrl.create({
      component: StripeComponent,
      cssClass: "StripeComponent",
      componentProps: { secretKey: clientSecret, price: this.totalPrice},
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    

    if (await this.isPay(clientSecret,orderID,appointment)) {
      if(this.AppointType=="Salon")
      {
        this.storage.remove("appoint_salon");
        this.storage.remove("appoint_Emp");
        this.storage.remove("appoint_date");
        this.storage.remove("appoint_services");
      }
      else
      {
      this.storage.remove("appoint_address");
      this.storage.remove("appoint_date");
      this.storage.remove("appoint_services");
      }
      this.nav.navigateForward(["success"]);

    }
  }

  async applyPromo()
  {
    if(this.promoCode==undefined || this.promoCode.length <= 4){
      const alert = await this.alrtCtrl.create({
        header: 'Code Promo',
        message: 'Veuillez entrer un code promo plus de 4 lettres minimum!',
        buttons: [
          {
            text: 'OK',
            role:'cancel'
          }
        ],

      });
  
      await alert.present();
    }
    else
    {
      await axios.post(this.url+'/promos/apply',{code:this.promoCode.toUpperCase()}).then( async (response)=>{
        this.goodPromoCode=response.data.res
        if(!this.goodPromoCode){
          this.errorPromoCode=response.data.message
        }
        else{
          this.amountPromo=response.data.amount;
          this.totalPrice=this.totalPrice - this.amountPromo;
        }

      }).catch((error)=>{console.log(error.response)});
    }
  }

  async isPay(secret,order,appoinment) {
    const stripe = await loadStripe(this.stripeKey);
    var res=true;
    await stripe.retrievePaymentIntent(secret).then((response) => {
      const result = response.paymentIntent.status;
      console.log(response);
      const d={
        order:order,
        appointment:appoinment,
        pay_int:response.paymentIntent.id
      }
      if (result == "requires_payment_method") {
        axios.post(this.url + "/orders/nopay" ,d, { headers: this.header });
        res= false;
      }
    }); 

    return res;
  }
  
}
