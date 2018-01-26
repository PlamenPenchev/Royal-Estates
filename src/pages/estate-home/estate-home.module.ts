import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EstateHomePage } from './estate-home';

@NgModule({
  declarations: [
    EstateHomePage,
  ],
  imports: [
    IonicPageModule.forChild(EstateHomePage),
  ],
})
export class EstateHomePageModule {}
