import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  friendsParties:any;
  friends = [];

  PartyPage = "PartyPage"
  ionViewDidLoad() {
    console.log('ionViewDidLoad PartiesPage');
    this.getFriends();
    this.getFriendsParties();
  }

  showCreateParty(){
    this.modalCtrl.create("CreatePartyPage").present();
  }

getFriends(){
  firebase.firestore().collection("users/" + firebase.auth().currentUser.uid + "/friends/")
  .onSnapshot((friendsSnap)=>{
    friendsSnap.forEach((friend)=>{
      this.friends.push(friend.data());
    })
  })
}

 getFriendsParties(){
   
  this.friends.forEach((friend)=>{

    firebase.firestore().collection("/parties/")
    .onSnapshot((partiesSnap)=>{
      partiesSnap.forEach((party)=>{
        console.log(party.data().uid, friend.uid)
        if(party.data().cid == friend.uid){
          this.friendsParties.push(party.data())
        }
      })
  })
  })
  console.log(this.friendsParties)
 }
   
}
