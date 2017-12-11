import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyPartiesPage } from './my-parties';

@NgModule({
  declarations: [
    MyPartiesPage,
  ],
  imports: [
    IonicPageModule.forChild(MyPartiesPage),
  ],
})
export class MyPartiesPageModule {}
