import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import 'firebase/firestore';

@IonicPage()
@Component({
  selector: 'page-add-friend',
  templateUrl: 'add-friend.html',
})
export class AddFriendPage {

  constructor(
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public navCtrl: NavController, 
    public navParams: NavParams) {
    

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddFriendPage');
    this.getAllUsers();
    
  }

  allUsers = [];
  schools: any;
  oldSchool;
  newSchool;


  confirmAddFriend(user){
    this.alertCtrl.create({
      title: "Send Friend Reqeust",
      message: "Are you sure you want to send a Friend Request",
      buttons: [{
        text: "Cancel"
      },{
        text: "Send",
        handler: data=>{
          this.addFriend(user)
          this.toastCtrl.create({
            message: "Friend Request Sent",
            duration: 3000,
            position: "bottom"
          }).present()
        }
      }]
    }).present()
  }

  addFriend(user){

    let currentUser;
    firebase.firestore().doc("users/" + firebase.auth().currentUser.uid)
    .get().then((u)=>{
      currentUser = u.data();

      let requestor={
        fname: user.fname,
        lname: user.lname,
        school: user.school,
        uid: user.uid,
        status: "Pending Request",
      };
      let requestie= {
        fname: currentUser.fname,
        lname: currentUser.lname,
        school: currentUser.school,
        uid: currentUser.uid,
        status: "Friend Requests",
        new: "yes"
      };
       firebase.firestore()
       .doc("users/" + currentUser.uid + "/friends/" + user.uid).set(requestor);
       firebase.firestore()
       .doc("users/" + user.uid + "/friends/" + currentUser.uid).set(requestie);

       this.getAllUsers()

    })
  

  }

  
  getAllUsers() {

    let friends = [];
    let users = [];
    
    firebase.firestore().collection("users/" + firebase.auth().currentUser.uid + "/friends/")
    .get().then((friendsSnap)=>{
      friendsSnap.forEach((friend)=>{
        friends.push(friend.data());
      })
    }).then((sucess)=>{
      firebase.firestore().collection("users/")
      .orderBy("school")
      .get().then((usersSnap)=>{
        
        usersSnap.forEach((user)=>{
  
            users.push(user.data());
          
        })
    }).then((s)=>{

      friends.forEach((friend)=>{
        users.forEach((user)=>{
          if(friend.uid == user.uid || firebase.auth().currentUser.uid == user.uid){
            let index = users.indexOf(user);
            users.splice(index, 1)
          }
          
          if(firebase.auth().currentUser.uid == user.uid){
            let index = users.indexOf(user);
            users.splice(index, 1)
          }
        })
      })
      this.allUsers = users;
    })


    })
  }


  closePage(){
    this.navCtrl.pop();
  }
  myHeaderFn(user) {
    this.oldSchool = this.newSchool;
    this.newSchool = user.school;
    if (this.oldSchool != this.newSchool) {
      
      return this.newSchool;
    }
    return null;
  }
}
