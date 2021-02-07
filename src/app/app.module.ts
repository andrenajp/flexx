import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FilterPageModule } from './filter/filter.module';
import { GiveRatingPageModule } from './give-rating/give-rating.module';
import { SharingPageModule } from './sharing/sharing.module';
import { LanguagePageModule } from './language/language.module';
import { DirectionPageModule } from './direction/direction.module';
import { LocationPageModule } from './location/location.module';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    FilterPageModule, GiveRatingPageModule, SharingPageModule, LanguagePageModule, DirectionPageModule, LocationPageModule,
    HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    OneSignal,
    Geolocation,

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
