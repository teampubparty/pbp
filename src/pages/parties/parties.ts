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
  

  // get friends
  firebase.firestore().collection("users/" + firebase.auth().currentUser.uid + "/friends/")
  
  .onSnapshot((friendSnap)=>{
    
    friendSnap.forEach((friend)=>{
      friends.push(friend.data());
    })
  })

  // get parties
  firebase.firestore().collection("/parties/")
  .onSnapshot((partiesSnap)=>{
    partiesSnap.forEach((party)=>{
      parties.push(party.data());
    })

    friends.forEach((friend)=>{
      parties.forEach((party)=>{
        if(friend.uid == party.cid){
          this.friendsParties.push(party);
        }
      })
    })
  
  })
  
 console.log(friends);
  console.log(this.friendsParties);
}

  
}
