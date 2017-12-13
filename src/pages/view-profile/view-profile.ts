import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import 'firebase/firestore';

@IonicPage()
@Component({
  selector: 'page-view-profile',
  templateUrl: 'view-profile.html',
})
export class ViewProfilePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewProfilePage');
    this.userid = this.navParams.data.cid;
    this.getUser(this.userid);
  }

user:any;
userid:string;

  getUser(userid){
    firebase.firestore().doc("/users/" + userid)
    .get().then((userSnap)=>{
      this.user = userSnap.data();
    })
  }
  closePage(){
    this.navCtrl.pop();
  }
}
