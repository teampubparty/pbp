import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import 'firebase/firestore'
import { User } from '../../modals/user';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
    this.getUser()
  }

  user:any

  getUser(){
    let db = firebase.firestore();
    db.doc("users/" + firebase.auth().currentUser.uid)
    .onSnapshot((userSnap)=>{
      this.user = userSnap.data()
    })
    
  }
  updateInterest(){
    this.alertCtrl.create({
      title: "Interests",
      inputs:[{
        type: "textarea",
        name: "newInterests",
        value: this.user.interests,
        placeholder: "Tell people a little bit about yourself.",
      }],
      buttons:[{
        text: "Cancel"
      },{
        text: "Update",
        handler: data =>{
          let db = firebase.firestore();
          db.doc("users/" + firebase.auth().currentUser.uid)
          .update({
            interests: data.newInterests
          })
          .catch((error)=>{
            this.toastCtrl.create({
              message: error.message,
              duration: 3000,
              position: "top"
            })
          })
        }
      }]
    }).present()
  }
  updateMajor(){
    this.alertCtrl.create({
      title: "Major",
      inputs:[{
        type: "textarea",
        name: "newMajor",
        value: this.user.major,
        placeholder: "Tell people your major",
      }],
      buttons:[{
        text: "Cancel"
      },{
        text: "Update",
        handler: data =>{
          let db = firebase.firestore();
          db.doc("users/" + firebase.auth().currentUser.uid)
          .update({
            major: data.newMajor
          })
          .catch((error)=>{
            this.toastCtrl.create({
              message: error.message,
              duration: 3000,
              position: "top"
            })
          })
        }
      }]
    }).present()
  }
}
