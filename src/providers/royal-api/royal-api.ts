
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

/*
  Generated class for the RoyalApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RoyalApiProvider {
  private baseUrl = 'https://real-estates-app.firebaseio.com/';
  currentLocation: any = {};
  constructor(public http: HttpClient) {
    console.log('Hello RoyalApiProvider Provider');
  }
  getLocations(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/locations.json`)
      .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }
  private handleError(err: HttpErrorResponse) {
    console.error(err);
    return Observable.throw(err);
  }
  getLocationData(locationId) : Observable<any> {
    return this.http.get(`${this.baseUrl}/locations-data/${locationId}.json`)
        .map(response => {
            this.currentLocation = response;
            return this.currentLocation;
    });
  }
  getCurrentLocation(){
    return this.currentLocation;
  }
  
  
}
