import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { MyEstatesPage, LocationsPage, MapPage, OverviewPage, SimilarPage, EstatesPage, EstateHomePage } from '../pages/pages';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { RoyalApiProvider } from '../providers/royal-api/royal-api';
import {HttpClientModule} from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import {IonicStorageModule } from '@ionic/storage';
import { UserSettingsProvider } from '../providers/user-settings/user-settings';
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    MyEstatesPage,
    LocationsPage,
    MapPage,
    OverviewPage,
    SimilarPage,
    EstatesPage,
    EstateHomePage,
    MapPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule, 
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBrNCIE1yVS3-cYTNKZtz0gYQI_sAIzR7E'
      
    }),
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['indexeddb']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    MyEstatesPage,
    LocationsPage,
    MapPage,
    OverviewPage,
    SimilarPage,
    EstatesPage,
    EstateHomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    
    RoyalApiProvider,
    UserSettingsProvider,
    UserSettingsProvider
  ]
})
export class AppModule {}
