import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import "firebase/firestore";
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

@IonicPage()
@Component({
  selector: 'page-my-parties',
  templateUrl: 'my-parties.html',
})
export class MyPartiesPage {


  constructor(
    public toastCtrl: ToastController,
    public navCtrl: NavController,
     public navParams: NavParams) {
  }

  attendedParties = [];
  createParties = [];
  invitedParties = [];
  goingParties = [];
  newRequests: any;
  editParty = "EditPartyPage";

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    
    this.getCreatedParties();
    this.getInviteParties();
    this.getGoingParties();
  }



  
getCreatedParties(){
  console.log("create parties");
  this.createParties = [];
  firebase.firestore().collection("/parties/")
  .where("cid", "==", firebase.auth().currentUser.uid)
  .get().then((partySnap)=>{
    partySnap.forEach((party)=>{
      this.createParties.push(party.data())
    })
  })
}
getGoingParties(){
  let today = new Date();
  // Current user uid
  let cUid = firebase.auth().currentUser.uid;
  this.goingParties = [];
  firebase.firestore().collection("/users/" + cUid + "/parties/")
  .where("status", "==", "Going")
  .where("date", ">=", today)
  .get().then((partySnap)=>{
    partySnap.forEach((invited)=>{
      this.goingParties.push(invited.data())
    })
  })
}

getInviteParties(){

  let today = new Date();
  // Current user uid
  let cUid = firebase.auth().currentUser.uid;
  this.invitedParties = [];
  firebase.firestore().collection("/users/" + cUid + "/parties/")
  .where("status", "==", "Invited")
  .where("date", ">=", today)
  .get().then((partySnap)=>{
    partySnap.forEach((invited)=>{
      this.invitedParties.push(invited.data())
    })
  })
}
getAttendedParties(){
  
    let today = new Date();
    // Current user uid
    let cUid = firebase.auth().currentUser.uid;
    this.attendedParties = [];
    firebase.firestore().collection("/users/" + cUid + "/parties/")
    .where("status", "==", "Invited")
    .where("date", "<", today)
    .get().then((partySnap)=>{
      partySnap.forEach((attended)=>{
        this.attendedParties.push(attended.data())
      })
    })
  }
  
viewParty(party){
  this.navCtrl.push("PartyPage", party);
}

  going(party){

    //Current User
    let cUser;
    firebase.firestore().doc("/users/" + firebase.auth().currentUser.uid)
    .get().then((userSnap)=>{
      cUser = userSnap.data();
      firebase.firestore().doc("/parties/" + party.pid + "/invited/" + cUser.uid)
      .update({
        status: "Going",
      }).then((sucess)=>{
        firebase.firestore().doc("/users/" + cUser.uid + "/parties/" + party.pid)
        .update({
          status: "Going",

        }).then((s)=>{
          this.getAttendedParties();
          this.getInviteParties();
          this.getGoingParties();
          this.toastCtrl.create({
            message: "You are listed as going to this party.",
            position: "bottom",
            duration: 3000
          }).present()
        })
      })

    })

  }

  deleteInvite(party){
    firebase.firestore().doc("users/" + firebase.auth().currentUser.uid + "/parties/" + party.pid)
    .delete();
    this.getAttendedParties();
    this.getInviteParties();
    this.getGoingParties();
  }


}
