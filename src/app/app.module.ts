import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyDSfNRGF0ztHPwJZymgi8kZPFmDLvZ10J8",
  authDomain: "pubparty-dev.firebaseapp.com",
  databaseURL: "https://pubparty-dev.firebaseio.com",
  projectId: "pubparty-dev",
  storageBucket: "pubparty-dev.appspot.com",
  messagingSenderId: "1046261746565"
};
firebase.initializeApp(config);


@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},

  ]
})
export class AppModule {}
