import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditPartyPage } from './edit-party';

@NgModule({
  declarations: [
    EditPartyPage,
  ],
  imports: [
    IonicPageModule.forChild(EditPartyPage),
  ],
})
export class EditPartyPageModule {}
