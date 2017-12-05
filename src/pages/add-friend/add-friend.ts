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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddFriendPage');
    this.getAllUsers();
  }

  allUsers = [];
  schools: any;
  oldSchool;
  newSchool;

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
      };
       firebase.firestore()
       .doc("users/" + currentUser.uid + "/friends/" + user.uid).set(requestor);
       firebase.firestore()
       .doc("users/" + user.uid + "/friends/" + currentUser.uid).set(requestie);


    })
  

  }
  getAllUsers() {

    let friends = [];
    let users = [];
    
    firebase.firestore().collection("users/" + firebase.auth().currentUser.uid + "/friends/")
    .onSnapshot((friendsSnap)=>{
      friendsSnap.forEach((friend)=>{
        friends.push(friend.data());
      })
    })

    firebase.firestore().collection("users/")
    .orderBy("school")
    .onSnapshot((usersSnap)=>{
      
      usersSnap.forEach((user)=>{

          users.push(user.data());
        
      })
      // console.log(friends);
      // console.log(users)
  
 
      var i;
      var o;
      for( o = 0; o < friends.length; o++){
        for (i = 0; i < users.length; i++) {
          if (users[i].uid != friends[o].uid) {
            this.allUsers.push(users[i])
          } else {
            
                      }
      }
      }

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
