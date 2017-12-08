import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import * as firebase from 'firebase';
import 'firebase/firestore';


@IonicPage()
@Component({
  selector: 'page-party',
  templateUrl: 'party.html',
})
export class PartyPage {

  constructor(
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ProfilePage = "ProfilePage";
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad PartyPage');
    this.party = this.navParams.data;
  }

  party;

  confirmRequestInvite(){
    let options = {
      title: "Request Invite",
      message: "Are you sure you want to request an invite?",
      buttons: [{
        text: "Cancel"
      },{
        text: "Request",
        handler: data=>{
        this.requestInvite();
        }
      }]
    }
    this.alertCtrl.create(options).present()
  }

  requestInvite(){
    let d = firebase.firestore().doc(this.party);
    console.log(d);
    
  }
}
