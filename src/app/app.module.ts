import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {IonicStorageModule} from '@ionic/storage';
import {Toast} from '@ionic-native/toast';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {DetailsPage} from '../pages/details/details';

@NgModule({
  declarations: [
MyApp,
HomePage,
DetailsPage
  ],
  imports: [
    BrowserModule, HttpModule, IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
MyApp,
HomePage,
DetailsPage
  ],
  providers: [
    StatusBar,
    Toast,
    SplashScreen, {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    }
  ]
})
export class AppModule {}
