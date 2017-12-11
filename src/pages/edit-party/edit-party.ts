import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { messaging } from 'firebase';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';

@IonicPage()
@Component({
  selector: 'page-edit-party',
  templateUrl: 'edit-party.html',
})
export class EditPartyPage {

  constructor(
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPartyPage');
    this.party = this.navParams.data;
    this.today = new Date().toISOString();
    this.getParty();
    this.date = new Date(this.party.date);
    console.log(this.date)
  }

  date;
  edit;
  party;
  today;


  openGuestList(){
    this.modalCtrl.create("GuestListPage", this.party).present();
  }
  confirmCloseEdit(){
    this.alertCtrl.create({
      title: "Close Edit Party",
      message: "Any unsaved changes will be deleted.",
      buttons:[{
        text: "Cancel"
      },{
        text: "Close Edit",
        handler: data=>{
          this.closeEdit();
        }
      }]
    }).present()
  }
  closeEdit(){
    this.getParty();
    this.edit = 'no'; 
  }
  confirmSaveEdit(){
    this.alertCtrl.create({
      title: "Save Edit Party",
      message: "Are you sure you want to save the changes made?",
      buttons:[{
        text: "Cancel"
      },{
        text: "Save",
        handler: data=>{
          this.saveEdit();
        }
      }]
    }).present()
  }
  saveEdit(){
    let newDate = new Date(this.party.dateString + " " + this.party.timeString);
    firebase.firestore().doc("/parties/" + this.party.pid)
    .update({
      name: this.party.name,
      date: newDate,
      dateString: this.party.dateString.toDateString(),
      timeString: this.party.timeString.toDateString(),
      directions: this.party.directions,
      location: this.party.location,
      rules: this.party.rules,
      activity: this.party.activity
    }).then((sucess)=>{
      this.toastCtrl.create({
        message: "Your party has been updated.",
        duration: 3000,
        position: "bottom"
      }).present()
    }).catch((error)=>{
      this.toastCtrl.create({
        message: error.message,
        position: "bottom",
        duration: 3000,
      }).present()
    })
    
  }
  confirmDeleteParty(){
    this.alertCtrl.create({
      title: "Delete Party",
      message: "Are you sure you want to delete your party?",
      buttons: [{
        text: "Cancel"
      },{
        text: "Delete Party",
        handler: data =>{
          this.deleteParty()
        }
      }]
    }).present()
  }
  deleteParty(){
    firebase.firestore().doc("/parties/" + this.party.pid)
    .delete().then((sucess)=>{
      this.navCtrl.pop();
      this.toastCtrl.create({
        message: "Your party has been deleted.",
        position: "bottom",
        duration: 3000
      }).present()
    }).catch((e)=>{
      this.toastCtrl.create({
        message: e.message,
        duration: 3000,
        position: "bottom"
      }).present()
    })
  }
  getParty(){
    firebase.firestore().doc("/parties/" + this.party.pid)
    .get().then((partySnap)=>{
      this.party = partySnap.data();
    })
  }
}
