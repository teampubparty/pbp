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

  allUsers:any;
  schools: any;
  oldSchool;
  newSchool;

  addFriend(user){

    let currentUser;
    firebase.firestore().doc("users/" + firebase.auth().currentUser.uid)
    .get().then((u)=>{
      currentUser = u.data();
      console.log(currentUser)

      let requestor={
        fname: user.fname,
        lname: user.lname,
        school: user.school,
        uid: user.uid,
        status: "pending",
      };
      let requestie= {
        fname: currentUser.fname,
        lname: currentUser.lname,
        school: currentUser.school,
        uid: currentUser.uid,
        status: "pending",
      };
       firebase.firestore()
       .doc("users/" + currentUser.uid + "/friends/" + user.uid).set(requestor);
       firebase.firestore()
       .doc("users/" + user.uid + "/friends/" + currentUser.uid).set(requestie);


    })
  

  }
  getAllUsers() {
    firebase.firestore().collection("users/").orderBy("school")
    .onSnapshot((usersSnap)=>{
      let users = [];
      usersSnap.forEach((user)=>{
        users.push(user.data());
      })
      this.allUsers = users;
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
