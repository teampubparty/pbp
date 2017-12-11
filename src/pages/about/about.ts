import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import 'firebase/firestore'
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
    this.user = this.navParams.data;
  }

  user:any
  edit;
  closePage(){
    this.navCtrl.pop();
  }


  confirmDeleteAccount(){
    this.alertCtrl.create({
      title: "Delete Account",
      message: "Are you sure you want to delete your account? This can not be undone.",
      buttons: [{
        text: "Cancel"
      },{
        text: "Delete Account",
        handler: data =>{
          this.deleteAccount()
        }
      }]
    }).present()
  }
  deleteAccount(){
    firebase.auth().currentUser.delete();
    firebase.firestore().doc("/users/" + firebase.auth().currentUser.uid)
    .delete().then((sucess)=>{
      this.logout();
      this.toastCtrl.create({
        message: "Your account has been deleted.",
        position: "bottom",
        duration: 3000
      }).present()
    }).catch((e)=>{
      this.toastCtrl.create({
        message: e.message,
        duration: 3000,
        position: "bottom"
      }).present()
    })
  }

  confirmSaveEdit(){
    this.alertCtrl.create({
      title: "Save Edit Profile",
      message: "Are you sure you want to save the changes made?",
      buttons:[{
        text: "Cancel"
      },{
        text: "Save",
        handler: data=>{
          this.saveEdit();
        }
      }]
    }).present()
  }
  saveEdit(){
    firebase.firestore().doc("/users/" + firebase.auth().currentUser.uid)
    .update({
      age: this.user.age,
      interests: this.user.interests,
      major: this.user.major,
    }).then((sucess)=>{
      this.toastCtrl.create({
        message: "Your profile has been updated.",
        duration: 3000,
        position: "bottom"
      }).present()
    }).catch((error)=>{
      this.toastCtrl.create({
        message: error.message,
        position: "bottom",
        duration: 3000,
      }).present()
    })
    
  }
  getUser(){
    let db = firebase.firestore();
    db.doc("users/" + firebase.auth().currentUser.uid)
    .onSnapshot((userSnap)=>{
      this.user = userSnap.data()
    })
  }
  confirmCloseEdit(){
    this.alertCtrl.create({
      title: "Close Edit Profile",
      message: "Any unsaved changes will be deleted.",
      buttons:[{
        text: "Cancel"
      },{
        text: "Close Edit",
        handler: data=>{
          this.closeEdit();
        }
      }]
    }).present()
  }
  closeEdit(){
    this.getUser();
    this.edit = 'no'; 
  }
  logout(){
    firebase.auth().signOut().then((sucess)=>{
      this.navCtrl.parent.parent.setRoot("WelcomePage")
    })
  }
}
