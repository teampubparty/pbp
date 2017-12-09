import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import "firebase/firestore";
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(
    public toastCtrl: ToastController,
    public navCtrl: NavController,
     public navParams: NavParams) {
  }

  user:any;
  createParties = [];
  invitedParties = [];
  menuPage= "MenuPage";
  editParty = "EditPartyPage";

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.getUser();
    this.getCreatedParties();
    this.getInviteParties();
  }

  getUser(){
    let db = firebase.firestore();
    db.doc("users/" + firebase.auth().currentUser.uid)
    .onSnapshot((userSnap)=>{
      this.user = userSnap.data()
    })
  }


getCreatedParties(){
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
  let today = new Date().toISOString();
  // Current user uid
  let cUid = firebase.auth().currentUser.uid;
 
  firebase.firestore().collection("/users/" + cUid + "/going/")
  .where("date", ">=", today)
  .get().then((partySnap)=>{
    partySnap.forEach((party)=>{
      this.invitedParties.push(party)
    })
  })
}
getInviteParties(){
  let today = new Date().toISOString();
  console.log(today)
  // Current user uid
  let cUid = firebase.auth().currentUser.uid;
  this.invitedParties = [];
  firebase.firestore().collection("/users/" + cUid + "/parties/")
  .where("status", "==", "Invited")
  .get().then((partySnap)=>{
    partySnap.forEach((invited)=>{
      this.invitedParties.push(invited.data())
    })
  })
}

viewParty(party){
  this.navCtrl.push("PartyPage", party);
}

  going(party){
    let cUser;
    firebase.firestore().doc("/users/" + firebase.auth().currentUser.uid)
    .get().then((userSnap)=>{
      cUser = userSnap.data();
      firebase.firestore().doc("/parties/" + party.pid + "/invited/" + cUser.uid)
      .update({
        status: "Going"
      }).then((sucess)=>{
        firebase.firestore().doc("/users/" + cUser.uid + "/parties/" + party.pid)
        .update({
          status: "Going"
        }).then((s)=>{
          this.toastCtrl.create({
            message: "You are listed as going to this party.",
            position: "bottom",
            duration: 3000
          }).present()
        })
      })

    })

  }
  showMessages(){
    this.navCtrl.push("MessagesPage");
  }
  showFriends(){
    this.navCtrl.push("FriendsPage");
  }
  showAbout(){
    this.navCtrl.push("AboutPage");
  }
}
