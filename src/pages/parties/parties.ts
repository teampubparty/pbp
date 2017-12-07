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
  PartyPage = "PartyPage"
  ionViewDidLoad() {
    console.log('ionViewDidLoad PartiesPage');
    this.getFriends();
  }

  showCreateParty(){
    this.modalCtrl.create("CreatePartyPage").present();
  }
  FriendsPartiesComponent = "FriendsPartiesComponent";

getFriends(){
  let parties = [];
  let friends = [];
  this.friendsParties = [];
console.log(this.friendsParties);
  // get friends

      // get parties
  firebase.firestore().collection("/parties/")
  .limit(3)
  .get().then((partiesSnap)=>{
    partiesSnap.forEach((party)=>{
      parties.push(party.data());
    })
  })

  firebase.firestore().collection("users/" + firebase.auth().currentUser.uid + "/friends/")
  .get().then((friendSnap)=>{
    friendSnap.forEach((friend)=>{
      friends.push(friend.data());
    })

    friends.forEach((friend)=>{
      parties.forEach((party)=>{
        if(friend.uid == party.cid){
          this.friendsParties.push(party);
        }
      })
    })
  

  })

}

doRefresh(refresher) {

  setTimeout(() => {
    this.getFriends()
    refresher.complete();
  }, 2000);
}

doInfinite(infiniteScroll) {
  console.log('Begin async operation');

  setTimeout(() => {
    let oldLength;
    let newLength = oldLength + 3;

    for (let i = 0; i < 3; i++) {
      this.items.push( this.items.length );
    }

    console.log('Async operation has ended');
    infiniteScroll.complete();
  }, 500);
}

}
