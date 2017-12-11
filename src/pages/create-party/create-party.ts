import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import 'firebase/firestore';

@IonicPage()
@Component({
  selector: 'page-create-party',
  templateUrl: 'create-party.html',
})
export class CreatePartyPage {

  constructor(
    public toastCtrl: ToastController,
    public alertCtrl:AlertController,
    public navCtrl: NavController, 
    public navParams: NavParams) {
    this.getCurrentDate();
  }

  today;


  getCurrentDate(){
    this.today = new Date().toISOString();

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatePartyPage');
  }

  closePage(){
    this.navCtrl.pop();
  }
  createParty(partyForm){
    let key = firebase.firestore().collection("/parties/").doc().id;
    let form = partyForm.value;
    let partyRef = firebase.firestore().doc("/parties/" + key);
    let newDate = new Date(form.date + " " + form.time);
    let data = {
        name: form.name,
        date: newDate,
        d: form.date,
        t: form.time,
        dateString: newDate.toDateString(),
        timeString: newDate.toLocaleTimeString(),
        location: form.location,
        directions: form.directions,
        activity: form.activity,
        rules: form.rules,
        cid: firebase.auth().currentUser.uid,
        pid: key,
    }
    partyRef.set(data).then((sucess)=>{
      this.navCtrl.pop();
      this.toastCtrl.create({
        message: "Your party has been created",
        duration: 3000,
        position: "bottom"
      }).present()
      .catch((error)=>{
      this.toastCtrl.create({
        message: error.message,
        duration: 3000,
        position: "top"
      }).present()
      })
    })


  }
  confirmCreateParty(partyForm){
    
    this.alertCtrl.create({
      title: "Create Party",
      message: "Are you sure you want to create the party?",
      buttons: [{
        text: "Cancel"
      },{
        text: "Create",
        handler: data=>{
          this.createParty(partyForm);
        }
      }]
    }).present()


  }
  updateCover(){
    console.log("Clicked")
  }
}
