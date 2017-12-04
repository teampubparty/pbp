import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  PartiesPage:string = "PartiesPage";
  MessagesPage:string = "MessagesPage";
  FriendsPage:string = "FriendsPage";
  ProfilePage:string = "ProfilePage";
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
