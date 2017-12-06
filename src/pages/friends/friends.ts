import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController, ActionSheetController } from 'ionic-angular';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

@IonicPage()
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})
export class FriendsPage {

  constructor(
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
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

  showFriendOptions(user){
    this.actionSheet.create({
      buttons: [
        {
          text: "Unfriend",
          handler: () => {
            this.confirmUnfriend(user)
          }
        }
      ]
    }).present()
  }
  confirmUnfriend(user){
    this.alertCtrl.create({
      title: "Unfriend",
      message: "Are you sure you want to unfriend this friend?",
      buttons: [{
        text: "Cancel"
        },{
          text: "Unfriend",
          handler: data =>{
            this.deletefriendCurrentUser(user, "Friend has been unfriended");
            this.deletefriendOtherUser(user);
          }
        }] 
      }).present()
      }
  confirmAcceptRequest(user){
    this.alertCtrl.create({
      title: "Accept Friend Request",
      message: "Are you sure you want to accept this friend request?",
      buttons: [{
        text: "Cancel"
        },{
          text: "Accept",
          handler: data =>{
            this.acceptfriendCurrentUser(user);
            this.acceptfriendOtherUser(user);
          }
        }] 
      }).present()
      }


      acceptfriendCurrentUser(user){
        firebase.firestore().doc("users/" + firebase.auth().currentUser.uid + "/friends/" + user.uid)
        .update({
          status: "Friends"
        })
        .then((sucess)=>{
          this.toastCtrl.create({
            message: "Friend Request has been accepted",
            duration: 3000,
            position: "top"
          }).present()
        })
        .catch((error)=>{
          this.toastCtrl.create({
            message: error.message,
            duration: 3000,
            position: "top",
          }).present()
        })
      }
    acceptfriendOtherUser(user){
      firebase.firestore().doc("users/" + user.uid + "/friends/" + firebase.auth().currentUser.uid)
      .update({
        status: "Friends"
      })
      .catch((error)=>{
        this.toastCtrl.create({
          message: error.message,
          duration: 3000,
          position: "top",
        }).present()
      })
    }


  confirmDeleteRequest(user){
    this.alertCtrl.create({
      title: "Delete Friend Request",
      message: "Are you sure you want to delete this friend request?",
      buttons: [{
        text: "Cancel"
        },{
          text: "Delete",
          handler: data =>{
            this.deletefriendCurrentUser(user, "Friend Request has been deleted");
          }
        }] 
      }).present()
      }

      confirmCancelPendingRequest(user){
  this.alertCtrl.create({
    title: "Cancel Pending Request",
    message: "Are you sure you want to cancel your friend request?",
    buttons: [{
      text: "Do not Cancel"
      },{
        text: "Cancel Request",
        handler: data =>{
          this.deletefriendCurrentUser(user, "Friend Request has been canceled");
          this.deletefriendOtherUser(user);
        }
      }] 
    }).present()
    }

  deletefriendCurrentUser(user, message){
      firebase.firestore().doc("users/" + firebase.auth().currentUser.uid + "/friends/" + user.uid)
      .delete()
      .then((sucess)=>{
        this.toastCtrl.create({
          message: message,
          duration: 3000,
          position: "top"
        }).present()
      })
      .catch((error)=>{
        this.toastCtrl.create({
          message: error.message,
          duration: 3000,
          position: "top",
        }).present()
      })
    }
  deletefriendOtherUser(user){
    firebase.firestore().doc("users/" + user.uid + "/friends/" + firebase.auth().currentUser.uid)
    .delete()
    .catch((error)=>{
      this.toastCtrl.create({
        message: error.message,
        duration: 3000,
        position: "top",
      }).present()
    })
  }
  viewProfile(){
    this.navCtrl.push("ProfilePage")
  }


}
