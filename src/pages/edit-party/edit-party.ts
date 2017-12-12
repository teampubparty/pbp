import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { messaging } from 'firebase';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-edit-party',
  templateUrl: 'edit-party.html',
})
export class EditPartyPage {

  constructor(
    public camera: Camera,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPartyPage');
    this.party = this.navParams.data;
    this.today = new Date().toISOString();
    this.getParty();
    this.date = new Date(this.party.date);
    this.coverUrl = this.party.pic;
  }

  date;
  edit;
  party;
  today;
  coverUrl;

  openGuestList(){
    this.modalCtrl.create("GuestListPage", this.party).present();
  }
  confirmCloseEdit(){
    this.alertCtrl.create({
      title: "Close Edit Party",
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
    this.getParty();
    this.edit = 'no'; 
  }
  confirmSaveEdit(){
    this.alertCtrl.create({
      title: "Save Edit Party",
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
    let newDate = new Date(this.party.d + " " + this.party.t);
    firebase.firestore().doc("/parties/" + this.party.pid)
    .update({
      name: this.party.name,
      pic: this.coverUrl,
      date: newDate,
      d: this.party.d,
      t: this.party.t,
      dateString: newDate.toDateString(),
      timeString: newDate.toLocaleTimeString(),
      directions: this.party.directions,
      location: this.party.location,
      rules: this.party.rules,
      activity: this.party.activity
    }).then((sucess)=>{
      this.toastCtrl.create({
        message: "Your party has been updated.",
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
  confirmDeleteParty(){
    this.alertCtrl.create({
      title: "Delete Party",
      message: "Are you sure you want to delete your party?",
      buttons: [{
        text: "Cancel"
      },{
        text: "Delete Party",
        handler: data =>{
          this.deleteParty()
        }
      }]
    }).present()
  }
  deleteParty(){
    firebase.firestore().doc("/parties/" + this.party.pid)
    .delete().then((sucess)=>{
      this.navCtrl.pop();
      this.toastCtrl.create({
        message: "Your party has been deleted.",
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
  getParty(){
    firebase.firestore().doc("/parties/" + this.party.pid)
    .get().then((partySnap)=>{
      this.party = partySnap.data();
    })
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
     let picRef = '/pictures/party/' + this.party.pid + "/cover.pic"
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
