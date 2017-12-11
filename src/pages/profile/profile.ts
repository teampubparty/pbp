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
}
