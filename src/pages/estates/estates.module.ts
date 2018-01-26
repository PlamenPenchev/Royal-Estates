import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EstatesPage } from './estates';

@NgModule({
  declarations: [
    EstatesPage,
  ],
  imports: [
    IonicPageModule.forChild(EstatesPage),
  ],
})
export class EstatesPageModule {}
