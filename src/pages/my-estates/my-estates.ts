import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { LocationsPage } from '../pages';
import { RoyalApiProvider } from '../../providers/royal-api/royal-api';
import { UserSettingsProvider } from '../../providers/user-settings/user-settings';

/**
 * Generated class for the MyEstatesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-estates',
  templateUrl: 'my-estates.html',
})
export class MyEstatesPage {
    favorites = [];
    estate: any = {};
    estates: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingController: LoadingController, public royalApi: RoyalApiProvider, public userSettings: UserSettingsProvider) {
  }

  ionViewDidLoad() {
    
    console.log('ionViewDidLoad MyEstatesPage');
    this.userSettings.getAllFavorites().then(favs => this.favorites = favs);
    
  }

  goToLocations(){
    this.navCtrl.push(LocationsPage);
  }

  ionViewDidEnter(){
    this.userSettings.getAllFavorites().then(favs => this.favorites = favs);
  }
  
}
