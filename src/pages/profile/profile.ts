import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import "firebase/firestore";
import { ModalController } from 'ionic-angular/components/modal/modal-controller';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(
    public modalCtrl: ModalController,
    public navCtrl: NavController, 
    public navParams: NavParams) {
    this.getUser();
    this.getNewFriends();
    this.getNewMessages();
    this.getNewPartyRequests();
  }

  getUser(){
    let db = firebase.firestore();
    db.doc("users/" + firebase.auth().currentUser.uid)
    .onSnapshot((userSnap)=>{
      this.user = userSnap.data()
    })
  }
user:any;
menuPage= "MenuPage";
newMessages;
newFriends;
newRequests;

  showMessages(){
    this.navCtrl.push("MessagesPage");
  }
  showFriends(){
    this.navCtrl.push("FriendsPage");
  }
  showMyParties(){
    this.navCtrl.push("MyPartiesPage");
  }
  updateProfile(user){
    this.modalCtrl.create("AboutPage", user).present()
  }

  getNewMessages(){
    this.newMessages = 1;
  }

  getNewFriends(){
    firebase.firestore().collection("/users/" + firebase.auth().currentUser.uid + "/friends/")
    .where("status", "==", "Friend Requests")
    .onSnapshot((friendsSnap)=>{
      this.newFriends = friendsSnap.docs.length
    })
  }
  getNewPartyRequests(){
    firebase.firestore().collection("/users/" + firebase.auth().currentUser.uid + "/parties/")
    .where("status", "==", "Requesting Invite")
    .onSnapshot((partySnap)=>{
      this.newRequests = partySnap.docs.length
    })
  }
}
