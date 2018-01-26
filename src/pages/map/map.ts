import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RoyalApiProvider } from '../../providers/royal-api/royal-api';
import _ from 'lodash';
declare var window: any;
/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  map: any = {};
  estate: any = {};
  estates: any[];
  private locationData: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public royalApi: RoyalApiProvider) {
    this.estate = this.navParams.get('estate');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    this.locationData = this.royalApi.getCurrentLocation();
    this.estates = _.chain(this.locationData.estates)
    .filter(e => e.id === this.estate.id).value();

    this.map = {
      lat: this.estate.latitude,
      lng: this.estate.longitude,
      zoom: 12,
      markerLabel: this.estate.region 
    };
  
  }
  getDirections() { 
    window.location = `geo:${this.map.lat},${this.map.lng};u=35`; 
  }
  goHome() {
    this.navCtrl.parent.parent.popToRoot();
  }
}
