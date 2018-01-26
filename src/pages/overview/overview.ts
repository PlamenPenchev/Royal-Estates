import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController  } from 'ionic-angular';
import _ from 'lodash';
import { RoyalApiProvider } from '../../providers/royal-api/royal-api';

import { UserSettingsProvider } from '../../providers/user-settings/user-settings';

/**
 * Generated class for the OverviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-overview',
  templateUrl: 'overview.html',
})
export class OverviewPage {
  estate: any = {};
  estates: any[];
  private locationData: any;
  dateFilter: string;
  team: any = {};
  games: any[];
  teamStanding: any = {}; 
  allGames: any[];
  useDateFilter = false;
  isFollowing = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public royalApi: RoyalApiProvider,
    public userSettings: UserSettingsProvider, public toastController: ToastController, public alertController: AlertController) {
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OverviewPage');
    this.estate = this.navParams.get('estate');
    this.locationData = this.royalApi.getCurrentLocation();
    this.estates = _.chain(this.locationData.estates)
    .filter(e => e.id === this.estate.id).value();
    this.userSettings.isFavoriteEstate(this.estate.refNumber).then(value => this.isFollowing = value);
    
  }
  
  goHome() {
    this.navCtrl.parent.parent.popToRoot();
  }
  toggleFollow() {
    if(this.isFollowing) {
      let confirm = this.alertController.create({
        title: "Unfollow?",
        message: "Are you sure you want to unfollow?",
        buttons: [
          {
            text: "Yes",
            handler: () => {
              this.isFollowing = false;
              let toast = this.toastController.create({
                message: "You have unfollowed this Estate!",
                duration: 2000,
                position: "bottom"
              });
            toast.present();
              // TODO persist data
              this.userSettings.unfavoriteEstate(this.estate);
            }
          },
          {
            text: "No"
          }
        ]
      });
      confirm.present();
    } else {
      this.isFollowing = true;
      // TODO persist data
      this.userSettings.favoriteEstate(
        this.estate,
        this.locationData.locaitonId,
        this.locationData.locationName,       

    );
    }
}

  /* estateClicked($event, estate) {
    let sourceEstate = this.locationData.estates.find(e => e.id === estate.estateId);
    this.navCtrl.parent.parent.push(EstatesPage, sourceEstate);
  } */
}
