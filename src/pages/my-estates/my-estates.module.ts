import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyEstatesPage } from './my-estates';

@NgModule({
  declarations: [
    MyEstatesPage,
  ],
  imports: [
    IonicPageModule.forChild(MyEstatesPage),
  ],
})
export class MyEstatesPageModule {}
