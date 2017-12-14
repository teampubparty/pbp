import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import * as firebase from 'firebase';
import 'firebase/firestore';
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
  friendsParties = [];
  friends = [];
  topParties = [];
  PartyPage = "PartyPage"
  ionViewDidLoad() {
    console.log('ionViewDidLoad PartiesPage');
    this.getFriends();
    this.view="friends";
  }

  showCreateParty(){
    this.modalCtrl.create("CreatePartyPage").present();
  }
  FriendsPartiesComponent = "FriendsPartiesComponent";

getFriends(){
  let parties = [];
  let friendsData = {};
  let friends = [];
  this.friendsParties = [];
  // get friends

      // get parties
  firebase.firestore().collection("/parties/")
  .get().then((partiesSnap)=>{
    partiesSnap.forEach((party)=>{
      parties.push(party.data());
    })
  }).then((s)=>{
    firebase.firestore().collection("users/" + firebase.auth().currentUser.uid + "/friends/")
    .where("status", "==", "Friends")
    .get().then((friendSnap)=>{
      friendSnap.forEach((friend)=>{
        let d = friend.data();
        friends.push(d);
      })
    }).then((sucess)=>{
  
      friends.forEach((friend)=>{

        parties.forEach((party)=>{

          if(friend.uid == party.cid){
            this.friendsParties.push(party);
          }
        })
      })
    })
  
   
  })

 

}
 getTopParties(){
   firebase.firestore().collection("/parties/")
   .orderBy("")
 }
doRefresh(refresher) {

  setTimeout(() => {
    this.getFriends();
    refresher.complete();
  }, 2000);
}

viewFriends(){
  this.view = "friends"
}
viewTop(){
  this.view = "top"
}

}
