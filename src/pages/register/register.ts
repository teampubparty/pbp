import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { User } from '../../modals/user';
import { NgForm } from '@angular/forms'
import * as firebase from 'firebase'
import 'firebase/firestore';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  
  password:string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl: ToastController,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  closePage(){
    this.navCtrl.pop();
  }


  register(registerForm:NgForm) {
    
    let form = registerForm.value;
    firebase.auth().createUserWithEmailAndPassword(form.email, form.password)
    .then((user)=>{
      let userid = firebase.auth().currentUser.uid;      
      let db = firebase.firestore();
        db.doc("/users/" + userid).set({
        fname: form.fname,
        lname: form.lname,
        school: form.school,
        email: form.email,
        age: form.age,
        uid: userid
      })
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
