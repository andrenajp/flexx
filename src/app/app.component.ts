import { Component, QueryList, ViewChildren } from '@angular/core';
import { IonRouterOutlet, Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { OneSignal } from '@ionic-native/onesignal/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
  public selectedIndex = 0;
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  key: any;
  err: any = {}
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar, private router: Router,
    private toast: ToastController,
    private oneSignal: OneSignal,

  ) {
    this.initializeApp();
    this.backButtonEvent();
  }
  backButtonEvent() {
    this.platform.backButton.subscribe(async () => {
      this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
        if (outlet && outlet.canGoBack()) {
          outlet.pop();
        } else if (
          this.router.url === "/tabs/home" ||
          this.router.url === "/tabs/appointment" ||
          this.router.url === "/tabs/search-layout" ||
          this.router.url === "/tabs/profile" ||
          this.router.url === "/login"
        ) {
          if (
            new Date().getTime() - this.lastTimeBackPress <
            this.timePeriodToExit
          ) {
            navigator["app"].exitApp();
          } else {
            this.presentToast();
            this.lastTimeBackPress = new Date().getTime();
          }
        }
      });
    });
  }
  async presentToast() {
    const toast = await this.toast.create({
      message: "Press Back to Exit App",
      duration: 500,
    });
    toast.present();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
    });

  }
  ngOnInit() {
  }
}
