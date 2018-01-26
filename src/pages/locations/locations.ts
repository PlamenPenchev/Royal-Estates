import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { EstatesPage } from '../pages';

import { RoyalApiProvider } from '../../providers/royal-api/royal-api';
/**
 * Generated class for the LocationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-locations',
  templateUrl: 'locations.html',
})
export class LocationsPage {
  locations: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public royalApi: RoyalApiProvider, public loadingController: LoadingController) {
  }

  ionViewDidLoad() {
    let loader = this.loadingController.create({
      content: 'Getting locations...',
      spinner: 'dots'
    });
    loader.present().then(() => {
      this.royalApi.getLocations().subscribe(
        locations => {
          this.locations = locations;
          loader.dismiss();
      });
    });
  }

  itemTapped($event, item) {
    this.navCtrl.push(EstatesPage, item);
  }
}
