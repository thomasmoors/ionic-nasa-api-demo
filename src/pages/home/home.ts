import {Component} from '@angular/core';
import {App, NavController, NavParams} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {DomSanitizer} from '@angular/platform-browser';
import {ToastController} from 'ionic-angular';
import {DetailsPage} from '../details/details';

@Component({selector: 'page-home', templateUrl: 'home.html'})
export class HomePage {

  api_key : any = 'NNKOjkoul8n1CH18TWA9gwngW1s1SmjESPjNoUFo'
  currentdata : any = {}
  tester : boolean;
  prebutton : boolean;
  nextbutton : boolean = true;
  count : number = 0;
  dates : any = [
    0,
    -1,
    -2,
    -3,
    -4
  ]
  constructor(public navCtrl : NavController, public sanitizer : DomSanitizer, public navParams : NavParams, public storage : Storage, public http : Http, public app : App, public toastCtrl : ToastController) {}

  getDetails(value) {
    let mydate = new Date();
    let mydate2 = new Date();

    let m = mydate2.getUTCMonth() + 1
    let today = mydate2.getUTCFullYear() + '-0' + m + '-' + mydate2.getDate();
    mydate.setDate(mydate.getDate() + value);
    let mymonth = mydate.getUTCMonth() + 1;
    let getday = mydate.getUTCFullYear() + '-0' + mymonth + '-' + mydate.getDate();
    if (today === getday) {
      this.nextbutton = true;
      this
        .navCtrl
        .push(DetailsPage, {date: today})
      return true;
    } else {
      this.nextbutton = false;

      let dat = mydate.getUTCFullYear() + '-0' + mymonth + '-' + mydate.getDate();
      this
        .navCtrl
        .push(DetailsPage, {date: dat})
      return dat;
    }
  }

  doRefresh(refresher) {
    this.presentToast('Loading 5 extra days');
    setTimeout(() => {
    for (let i=0; i <= 5; i++) {
      let myval = (this.dates.length * -1) - 1
      this
        .dates
        .push(myval);
    }
      this.presentToast('done loading');
      refresher.complete();
    }, 1500);
  }

  mydateformat(value) {
    let mydate = new Date();
    let mydate2 = new Date();
    let m = mydate2.getUTCMonth() + 1
    let today = mydate2.getUTCFullYear() + '-0' + m + '-' + mydate2.getDate();
    mydate.setDate(mydate.getDate() + value);
    let mymonth = mydate.getUTCMonth() + 1;
    let getday = mydate.getUTCFullYear() + '-0' + mymonth + '-' + mydate.getDate();

    if (today === getday) {
      this.nextbutton = true;
      return today;
    } else {
      this.nextbutton = false;
      return mydate.getUTCFullYear() + '-0' + mymonth + '-' + mydate.getDate();
    }
  }

  presentToast(mess) {
    let toast = this
      .toastCtrl
      .create({message: mess, duration: 1000, position: 'middle'});
    toast.present();
  }

}
