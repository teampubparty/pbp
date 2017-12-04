import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { NgForm } from '@angular/forms';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl: ToastController,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  closePage(){
    this.navCtrl.pop();
  }

  login(formLogin:NgForm){
    let form = formLogin.value;
    firebase.auth().signInWithEmailAndPassword(form.email, form.password)
    .then((sucess)=>{
      this.navCtrl.setRoot("VerificationPage")
    })
    .catch((error)=>{
      this.toastCtrl.create({
        message: error.message,
        duration: 3000,
        position: "top"
      }).present()
    })
  }
}
