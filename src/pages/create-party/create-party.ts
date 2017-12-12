import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Camera, CameraOptions} from '@ionic-native/camera';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import 'firebase/firestore';

@IonicPage()
@Component({
  selector: 'page-create-party',
  templateUrl: 'create-party.html',
})
export class CreatePartyPage {

  constructor(
    public camera: Camera,
    public toastCtrl: ToastController,
    public alertCtrl:AlertController,
    public navCtrl: NavController, 
    public navParams: NavParams) {
    this.getCurrentDate();
  }

  key;
  today;
  coverUrl;

  getCurrentDate(){
    this.today = new Date().toISOString();

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatePartyPage');
    this.createPartyKey();
    this.coverUrl = "../../assets/imgs/defaultCover.jpg";
  }

  createPartyKey(){
    this.key = firebase.firestore().collection("/parties/").doc().id;
    
  }
  closePage(){
    this.navCtrl.pop();
  }
  createParty(partyForm){
    let form = partyForm.value;
    let partyRef = firebase.firestore().doc("/parties/" + this.key);
    let user;
    let newDate = new Date(form.date + " " + form.time);

    firebase.firestore().doc("/users/" + firebase.auth().currentUser.uid)
    .get().then((sucess)=>{
      user = sucess.data(); 
    
    let data = {
        name: form.name,
        pic: this.coverUrl,
        cPic: user.pic,
        date: newDate,
        d: form.date,
        t: form.time,
        dateString: newDate.toDateString(),
        timeString: newDate.toLocaleTimeString(),
        location: form.location,
        directions: form.directions,
        activity: form.activity,
        rules: form.rules,
        cid: firebase.auth().currentUser.uid,
        pid: this.key,
    }
     partyRef.set(data).then((sucess)=>{
      this.navCtrl.pop();
      this.toastCtrl.create({
        message: "Your party has been created",
        duration: 3000,
        position: "bottom"
      }).present()
      .catch((error)=>{
      this.toastCtrl.create({
        message: error.message,
        duration: 3000,
        position: "top"
      }).present()
      })
    })
  })

  }
  confirmCreateParty(partyForm){
    
    this.alertCtrl.create({
      title: "Create Party",
      message: "Are you sure you want to create the party?",
      buttons: [{
        text: "Cancel"
      },{
        text: "Create",
        handler: data=>{
          this.createParty(partyForm);
        }
      }]
    }).present()


  }

  async  updateCover(){
    // Current user id
    let uid = firebase.auth().currentUser.uid;
    try {
      let options: CameraOptions = {
        quality: 100,
        targetHeight: 600,
        sourceType: 0,
        targetWidth: 600,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true,
        
      }
    
   
  
     let result = await this.camera.getPicture(options);
     let picRef = '/pictures/party/' + this.key + "/cover.pic"
     let pictures = firebase.storage().ref(picRef);
     let image = `data:image/jpeg;base64,${result}`
     pictures.putString(image, `data_url`).then((sucess)=>{
       
       pictures.getDownloadURL().then((url)=>{
        this.coverUrl = url
       })
  
      
     })
  
  
  
  
      } catch(e){
        console.log(e);
      }
    }
}
