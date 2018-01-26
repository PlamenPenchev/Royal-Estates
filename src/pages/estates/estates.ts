import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { EstateHomePage } from '../pages';
import { RoyalApiProvider } from '../../providers/royal-api/royal-api';
import _ from 'lodash';
/**
 * Generated class for the EstatesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-estates',
  templateUrl: 'estates.html',
})
export class EstatesPage {
  estatesSort: any =[];
  estates: any = [];
  estate: any = {};
  private allTeamDivisions: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public royalApi: RoyalApiProvider, public loadingController: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EstatesPage');
    let loader = this.loadingController.create({
      content: 'Getting locations...',
      spinner: 'dots'
    });
    loader.present().then(() => {
    let selectedLocation= this.navParams.data;
    this.royalApi.getLocationData(selectedLocation.id).subscribe(data => {
      this.estates = data.estates;
      this.allTeamDivisions =
      _.chain(data.estates)
      .groupBy('region')
      .toPairs()
      .map(item => _.zipObject(['regionName', 'regionEstates'], item))
      .value();
      this.estatesSort = this.allTeamDivisions;
    });
    loader.dismiss();
  });
};
  

  

  
  itemTapped($event, estate) {
    this.navCtrl.push(EstateHomePage, {estate: estate});
    
  } 
}
