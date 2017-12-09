import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import * as firebase from 'firebase';
import 'firebase/firestore';


@IonicPage()
@Component({
  selector: 'page-party',
  templateUrl: 'party.html',
})
export class PartyPage {

  constructor(
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ProfilePage = "ProfilePage";
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad PartyPage');
    this.party = this.navParams.data;
    this.getInviteStatus();
  }

  party;
  requestStatus;
  confirmRequestInvite(){
    let options = {
      title: "Request Invite",
      message: "Are you sure you want to request an invite?",
      buttons: [{
        text: "Cancel"
      },{
        text: "Request",
        handler: data=>{
        this.requestInvite();
        }
      }]
    }
    this.alertCtrl.create(options).present()
  }

  requestInvite(){
    //cUser is current User
    let cUser;
    firebase.firestore().doc("/users/" + firebase.auth().currentUser.uid)
    .get().then((userSnap)=>{
      cUser = userSnap.data()
    }).then((sucess)=>{
      let party;
      firebase.firestore().doc("parties/" + this.party.pid + "/invited/" + cUser.uid)
      .set({
        fname: cUser.fname,
        lname: cUser.lname,
        school: cUser.school,
        uid: cUser.uid,
        status: "Requesting Invite",
      }).then((sucess)=>{
        this.navCtrl.pop();
      }).then((s)=>{
        this.toastCtrl.create({
          message: "A party invite has been requested.",
          position: "bottom",
          duration: 3000,
        }).present()
      }).catch((error)=>{
        this.toastCtrl.create({
          message: error.message,
          position: "bottom",
          duration: 3000,
        }).present();

      })
    })
   
  }
  confirmCancelRequest(){
    this.alertCtrl.create({
      title: "Cancel Request",
      message: "Are you sure you want to cancel your invite request?",
      buttons:[{
        text: "Dont Cancel"
      },{
        text: "Cancel Request",
        handler: data=>{
          this.cancelReqeust()
        }
      }]
    }).present()
  }
  cancelReqeust(){
    firebase.firestore().doc("parties/" + this.party.pid + "/invited/" + firebase.auth().currentUser.uid)
    .delete().then((sucess)=>{
      this.navCtrl.pop();
    }).then((s)=>{
      this.toastCtrl.create({
        message: "Your invite request has been cancel.",
        position: "bottom",
        duration: 3000,
      }).present()
    }).catch((error)=>{
      this.toastCtrl.create({
        message: error.message,
        position: "bottom",
        duration: 3000
      }).present()
    })
  }

  getInviteStatus(){
    firebase.firestore().doc("parties/" + this.party.pid + "/invited/" + firebase.auth().currentUser.uid)
    .get().then((sucess)=>{
     if(sucess.exists){
       this.requestStatus = sucess.data().status;
     } else{
       this.requestStatus = 'No Invite Status';
     }
    })
    .catch((error)=>{
      console.log(error.message)
    })
  }
}
