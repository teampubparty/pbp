import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase'
import { User } from '../../modals/user';
import { firestore } from 'firebase';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
@IonicPage()
@Component({
  selector: 'page-verification',
  templateUrl: 'verification.html',
})
export class VerificationPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController) {
  }

 email:string;

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerificationPage');
    this.checkEmailVerified();

  }

 getEmail(){
  this.email = firebase.auth().currentUser.email;
 }
 checkEmailVerified(){
   let emailVerified = firebase.auth().currentUser.emailVerified;
   if(emailVerified) {
     this.navCtrl.setRoot("TabsPage")
   } else {
    this.getEmail();
    this.sendEmail();
   }
 }
  changeEmail(){
    this.alertCtrl.create({
      title: "Update Email",
      message: "Please enter your new email address",
      inputs: [{
        name: 'newEmail',
        placeholder: "New Email",
        value: this.email,
      }],
      buttons: [{
        text: "Cancel"
      },
    {
      text: "Update",
      handler: data =>{
        firebase.auth().currentUser.updateEmail(data.newEmail)
        .then((sucess)=>{
          this.getEmail();
        })
        .catch((error)=>{
          this.toastCtrl.create({
            message: error.message,
            duration: 3000,
            position: "top"
          }).present()
        })
      }
    }]
    }).present();
    
  }
  logOut(){
    firebase.auth().signOut().then((sucess)=>{
      this.navCtrl.pop();
    })
  }
  sendEmail(){
    firebase.auth().currentUser.sendEmailVerification()
    .then((sucess)=>{
      this.toastCtrl.create({
        message: "Confirmation email has been sent to " + this.email,
        duration: 3000,
        position: "top"
      }).present()
    })
  }
}
