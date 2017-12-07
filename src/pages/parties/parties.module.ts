import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PartiesPage } from './parties';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    PartiesPage,
  ],
  imports: [
    IonicPageModule.forChild(PartiesPage),
    ComponentsModule,
  ],
})
export class PartiesPageModule {}
