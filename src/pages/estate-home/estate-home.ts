import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OverviewPage, SimilarPage, MapPage } from '../pages';
import _ from 'lodash';
import { RoyalApiProvider } from '../../providers/royal-api/royal-api';
/**
 * Generated class for the EstateHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-estate-home',
  templateUrl: 'estate-home.html',
})
export class EstateHomePage {

  estates: any[];
  private locationData: any;
  overviewTab: any;
  similarTab: any;
  mapTab: any;
  estate: any = {};
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public royalApi: RoyalApiProvider) {
    this.overviewTab = OverviewPage;
    this.similarTab = SimilarPage;
    this.mapTab = MapPage;
    this.estate = this.navParams.get('estate');
    this.locationData = this.royalApi.getCurrentLocation();
    this.estates = _.chain(this.locationData.estates)
    .filter(e => e.id === this.estate.id).value();
    
  }

  ionViewDidLoad() {
    
    console.log('ionViewDidLoad EstateHomePage');
    this.locationData = this.royalApi.getCurrentLocation();
    this.estates = _.chain(this.locationData.estates)
    .filter(e => e.id === this.estate.id).value();
  }
  goHome() {
    this.navCtrl.popToRoot();
  }
  
}
