import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
@IonicPage()
@Component({
  selector: 'page-guest-list',
  templateUrl: 'guest-list.html',
})
export class GuestListPage {

  constructor(
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GuestListPage');
    this.party = this.navParams.data;
    this.getParty();
    this.getRequestingInvite();
    this.getInvited();
  }

  party;
  allInvited = [];
  allInviteRequesting = [];

  getParty(){
    firebase.firestore().doc("/parties/" + this.party.pid)
    .get().then((partySnap)=>{
      this.party = partySnap.data();
    })
  }
  confirmCancelInvite(user){
    this.alertCtrl.create({
      title: "Delete Invite",
      message: "Are you sure you want to delete the invite?",
      buttons: [{
        text: "Dont Cancel"
      },{
        text: "Cancel Invite",
        handler: data =>{
          this.cancelInvite(user);
        }
      }] 
    }).present()
  }
    cancelInvite(user){
      firebase.firestore().doc("/parties/" + this.party.pid + "/invited/" + user.uid)
      .delete().then((sucess)=>{
        this.allInvited = [];
        this.allInviteRequesting = [];
        this.getRequestingInvite();
        this.getInvited();
        this.toastCtrl.create({
          message: "Invite to " + user.fname + " has been deleted",
          duration: 3000,
          position: "bottom"
        }).present()
      }).catch((e)=>{
        this.toastCtrl.create({
          message: e.message,
          position: "bottom",
          duration: 3000,
        }).present()
      })
    }
confirmSendInvite(user){
  this.alertCtrl.create({
    title: "Send Invite",
    message: "Are you sure you want to send an invite?",
    buttons: [{
      text: "Cancel"
    },{
      text: "Send Invite",
      handler: data =>{
        this.sendInvite(user);
      }
    }] 
  }).present()
}
  sendInvite(user){
    //cUser is current User
    let cUser;
    firebase.firestore().doc("users/" + firebase.auth().currentUser.uid)
    .get().then((userSnap)=>{
      let cUser = userSnap.data();
      firebase.firestore().doc("users/" + user.uid + "/parties/" + this.party.pid)
      .set({
        status: "Invited",
        pid: this.party.pid,
        name: this.party.name,
        date: this.party.date, 
        dateString: this.party.dateString,
        timeString: this.party.timeString,
        cFname: cUser.fname,
        cLname: cUser.lname,
        })
    })
    firebase.firestore().doc("/parties/" + this.party.pid + "/invited/" + user.uid)
    .update({
      status: "Invited"
    }).then((sucess)=>{
      this.allInvited = [];
      this.allInviteRequesting = [];
      this.getRequestingInvite();
      this.getInvited();
      this.toastCtrl.create({
        message: "Invite has been sent to " + user.fname,
        duration: 3000,
        position: "bottom"
      }).present()
    }).catch((e)=>{
      this.toastCtrl.create({
        message: e.message,
        position: "bottom",
        duration: 3000,
      }).present()
    })
  }
  closePage(){
    this.navCtrl.pop();
  }

  getRequestingInvite(){
    firebase.firestore().collection("/parties/" + this.party.pid + "/invited/")
    .where("status", "==", "Requesting Invite")
    .get().then((invitedSnap)=>{
      invitedSnap.forEach((requesting)=>{
        this.allInviteRequesting.push(requesting.data());
      })
    })
  }
  getInvited(){
    firebase.firestore().collection("/parties/" + this.party.pid + "/invited/")
    .where("status", "==", "Invited")
    .get().then((invitedSnap)=>{
      invitedSnap.forEach((invited)=>{
        this.allInvited.push(invited.data());
      })
      console.log(this.allInvited)
    })
  }
}
