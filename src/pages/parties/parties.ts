import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';

@IonicPage()
@Component({
  selector: 'page-parties',
  templateUrl: 'parties.html',
})
export class PartiesPage {

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public modalCtrl: ModalController) {
  }

  view:string;

  PartyPage = "PartyPage"
  ionViewDidLoad() {
    console.log('ionViewDidLoad PartiesPage');
    this.view = 'friends';
  }

  showCreateParty(){
    this.modalCtrl.create("CreatePartyPage").present();
  }

 changeView(e) {
  e.target.bgColor = "darkblue";
  console.log(e.target.class)
  
 }
   
}
