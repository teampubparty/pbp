import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
    this.checkLoggedin();
  }

  checkLoggedin(){
    let user = firebase.auth().onAuthStateChanged((user)=>{
      if(user && user.emailVerified){
        this.navCtrl.setRoot("TabsPage")
      }
    })

  }
  showLoginPage(){
    this.modalCtrl.create("LoginPage").present()
  }
  showRegisterPage(){
    this.modalCtrl.create("RegisterPage").present()
  }

}
