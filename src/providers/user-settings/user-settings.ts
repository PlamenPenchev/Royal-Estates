import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
/*
  Generated class for the UserSettingsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserSettingsProvider {
  
  constructor(public http: HttpClient, public storage: Storage, public events: Events) {
    console.log('Hello UserSettingsProvider Provider');
  }
  favoriteEstate(estate, locationId, locationName) {
    let item = { 
      estate: estate,
      locationId: locationId,
      locationName: locationName
      };
    this.storage.set(estate.refNumber.toString(), JSON.stringify(item)).then(() => {
      this.events.publish('favorites:changed');
});
  }
  unfavoriteEstate(estate) {
    this.storage.remove(estate.refNumber.toString());
    this.events.publish('favorites:changed');
  } 
  isFavoriteEstate(estateId) : Promise<boolean> {
    return this.storage.get(estateId.toString()).then(value => value ? true : false);
  }  
  getAllFavorites() : Promise<any[]> {
    return new Promise(resolve => {
        let results = [];
        this.storage.forEach(data => {
            results.push(JSON.parse(data));
        });
        return resolve(results);
    });
}
}
