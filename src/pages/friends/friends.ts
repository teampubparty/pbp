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
    this.getFriendRequest();
    this.getPendingFriends();
    this.activity = this.friendsLength + this.requestsLength + this.pendingLength;
    console.log(this.friends, this.activity, this.pendingFriends, this.friendRequests)
  }

friends:any;
activity: any;
pendingFriends:any;
friendRequests: any;
friendsLength:number;
requestsLength:number;
pendingLength:number;
oldFriend:any;
newFriend:any;

  getFriends(){
    firebase.firestore()
    .collection("users/" + firebase.auth().currentUser.uid + "/friends/")
    .where("status", "==", "Friends")
    .onSnapshot((usersSnap)=>{
      let users = [];
      usersSnap.forEach((user)=>{
        users.push(user.data());
      })
      this.friends = users;
      if(users.length == undefined){
        this.friendsLength = 0
      } else {
        this.friendsLength = this.friends.length;
      }
      console.log(this.friendsLength)
      
    })
  }
  getPendingFriends(){
    firebase.firestore()
    .collection("users/" + firebase.auth().currentUser.uid + "/friends/")
    .where("status", "==", "Pending Request")
    .onSnapshot((usersSnap)=>{
      let users = [];
      usersSnap.forEach((user)=>{
        users.push(user.data());
      })
      this.pendingFriends = users;
      if(users.length == undefined){
        this.pendingLength = 0
      } else {
        this.pendingLength = this.pendingFriends.length;
      }
      console.log(this.pendingLength)
    })
  }
  getFriendRequest(){
    firebase.firestore()
    .collection("users/" + firebase.auth().currentUser.uid + "/friends/")
    .where("status", "==", "Friend Requests")
    .onSnapshot((usersSnap)=>{
      let users = [];
      usersSnap.forEach((user)=>{
        users.push(user.data());
      })
      this.friendRequests = users;
      if(users.length == undefined){
        this.requestsLength = 0
      } else {
        this.requestsLength = this.friendRequests.length;
      }
      console.log(this.requestsLength)
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
