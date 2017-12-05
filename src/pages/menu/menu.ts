import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }


  confirmLogout() {
    this.alertCtrl.create({
      title: "Log Out",
      message: "Are you sure you want to Log Out?",
      buttons:[{
        text: "Cancel"
      },{
        text: "Log Out",
        handler: data=>{
          this.logout()
        }
      }]
    }).present()
  }

    logout(){
      firebase.auth().signOut().then((sucess)=>{
        this.navCtrl.parent.parent.setRoot("WelcomePage")
      })
    }
  
}
