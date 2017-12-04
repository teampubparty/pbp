import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController, ActionSheetController } from 'ionic-angular';
import * as firebase from 'firebase';
import 'firebase/firestore';

@IonicPage()
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})
export class FriendsPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public actionSheet: ActionSheetController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendsPage');
    this.getFriends();
  }

friends:any;
friendsLength:number;

  getFriends(){
    firebase.firestore()
    .collection("users/" + firebase.auth().currentUser.uid + "/friends")
    .onSnapshot((usersSnap)=>{
      let users = [];
      usersSnap.forEach((user)=>{
        users.push(user.data());
      })
      this.friends = users;
      this.friendsLength = this.friends.length;
      console.log(users);
      console.log(this.friends);
      console.log(this.friendsLength);
    })
  }
  showAddFriend(){
    this.modalCtrl.create("AddFriendPage").present()
  }

  showFriendOptions(){
    this.actionSheet.create({
      buttons: [
        {
          text: "Unfriend"
        }
      ]
    }).present()
  }

  viewProfile(){
    this.navCtrl.push("ProfilePage")
  }
}
