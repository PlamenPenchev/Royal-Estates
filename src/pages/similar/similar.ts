import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RoyalApiProvider } from '../../providers/royal-api/royal-api';
import _ from 'lodash';
/**
 * Generated class for the SimilarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-similar',
  templateUrl: 'similar.html',
})
export class SimilarPage {
  similar: any[];
  estate: any = {};
  allSimilar: any[];
  regionFilter = 'region';
  kindFilter = "all";
  estates: any[];
  similarByType: any;
  useDataFilter = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public royalApi: RoyalApiProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SimilarPage');
    this.estate = this.navParams.get('estate');
    let locationData = this.royalApi.getCurrentLocation();
    this.similar = locationData.estates;
    
     //this.allSimilar = _.chain(this.similar)
       // .groupBy('region')
        //.toPairs()
       // .map(item => _.zipObject(['divisionName', 'divisionStandings'], item))
       // .value();
        this.allSimilar = locationData.estates;
        this.filterType(); 
        //this.filterKind();
  }
  filterType(){
    if(this.regionFilter === 'all'){
      this.similar = this.allSimilar;
      if (this.kindFilter === 'House' && this.useDataFilter==true){
        
       this.similarByType =  _.filter(this.similar, s => s.type === 'House');
      } else if(this.kindFilter === 'Studio' && this.useDataFilter==true){
      this.similarByType =  _.filter(this.similar, s => s.type === 'Studio');
      }
      else if (this.kindFilter === 'Apartment' && this.useDataFilter==true){
       
        this.similarByType =  _.filter(this.similar, s => s.type === 'Apartment');
      } else {
        this.similarByType = this.allSimilar;
      }
    } else {
      this.similar = _.filter(this.allSimilar, s => s.region === this.estate.region);
      if (this.kindFilter === 'House' && this.useDataFilter==true){
        
       this.similarByType =  _.filter(this.similar, s => s.type === 'House');
      } else if(this.kindFilter === 'Studio' && this.useDataFilter==true){
      this.similarByType =  _.filter(this.similar, s => s.type === 'Studio');
      }
      else if (this.kindFilter === 'Apartment' && this.useDataFilter==true){
        
        this.similarByType =  _.filter(this.similar, s => s.type === 'Apartment');
      } else {
        this.similarByType = this.similar;
      }
      
      
    }
  }
  dataChanged(){
    this.useDataFilter == !this.useDataFilter;
    if (this.useDataFilter==false){
      this.filterType();
    }
  }
  /* filterKind() {
    if (this.kindFilter === 'House'){
      this.filterDivision();
     this.similar =  _.filter(this.similar, s => s.type === 'House');
    }else if (this.kindFilter === 'Studio'){
      this.filterDivision();
      this.similar =  _.filter(this.similar, s => s.type === 'Studio');
    }else if (this.kindFilter === 'Apartment'){
      this.filterDivision();
      this.similar =  _.filter(this.similar, s => s.type === 'Apartment');
    }else {
      this.filterDivision();
    }
  } */
  getHeader(record, recordIndex, records){
    if (recordIndex === 0 || record.region !== records[recordIndex-1].region) {
      return record.region;
    }
    return null;  
  }
  goHome() {
    this.navCtrl.parent.parent.popToRoot();
  }
}
