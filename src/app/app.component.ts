import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyEstatesPage, LocationsPage, EstateHomePage } from '../pages/pages';
import { UserSettingsProvider } from '../providers/user-settings/user-settings';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { RoyalApiProvider } from '../providers/royal-api/royal-api';
import { Events } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = MyEstatesPage;
  favoriteEstates: any[];
  

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public userSettings: UserSettingsProvider,
     public loadingController: LoadingController, public royalApi: RoyalApiProvider,public events: Events) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    
    this.events.subscribe('favorites:changed', () => this.refreshFavorites());
    this.refreshFavorites();
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  goHome() {
    this.nav.push(MyEstatesPage);
  }
  goToLocations() {
    this.nav.push(LocationsPage);
  }
  refreshFavorites() {
    this.userSettings.getAllFavorites().then(favs => this.favoriteEstates = favs);
  }
  goToEstate(favorite) {
    let loader = this.loadingController.create({
      content: 'Getting data...',
      dismissOnPageChange: true
    });
    loader.present();
    this.royalApi.getLocationData(favorite.locationId).subscribe(l => this.nav.push(EstateHomePage, favorite));
}
}