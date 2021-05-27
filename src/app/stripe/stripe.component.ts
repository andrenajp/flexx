import { Component, Input, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { environment } from "src/environments/environment.prod";
import { loadStripe } from "@stripe/stripe-js";

@Component({
  selector: "app-stripe",
  templateUrl: "./stripe.component.html",
  styleUrls: ["./stripe.component.scss"],
})
export class StripeComponent implements OnInit {
  @Input() secretKey;
  @Input() price; 
  stripeKey = environment.stripeToken;
  card;
  stripe; 
  user=JSON.parse(localStorage.getItem('_user'));
  constructor(private modalCtrl: ModalController) {   }

  async ngOnInit() {
    const stripe = await loadStripe(this.stripeKey);
    var elements = stripe.elements();

    const card = elements.create("card", {
      iconStyle: "solid",
      style: {
        base: {
          iconColor: "#c4f0ff",
          color: "#fff",
          fontWeight: 500,
          fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
          fontSize: "16px",
          fontSmoothing: "antialiased",

          ":-webkit-autofill": {
            color: "#fce883",
          },
          "::placeholder": {
            color: "#87BBFD",
          },
        },
        invalid: {
          iconColor: "#FFC7EE",
          color: "#FFC7EE",
        },
      },
    });

    card.mount("#card");
    const sKey = await this.secretKey;
    var form = document.getElementById("payment-form");
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      pay();

    });

    let pay=()=>{
      stripe.confirmCardPayment(sKey, {
        payment_method: {
          card: card,
        },
      }).then((response)=>{
        this.modalCtrl.dismiss(null,'pay');
      })
    }

  }

  close()
  {
    this.modalCtrl.dismiss("null",'canceled');
  }


}
