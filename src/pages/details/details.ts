import {Component} from '@angular/core';
import {App, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {DomSanitizer} from '@angular/platform-browser';
import {ToastController} from 'ionic-angular';

/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({selector: 'page-details', templateUrl: 'details.html'})
export class DetailsPage {

  api_key : any = '0pHTbFO03K3WBSGdxwLYVrK2KAcDP6gmIVGGW09q'
  currentdata : any = {}
  tester : boolean;
  prebutton : boolean;
  nextbutton : boolean = true;
  count : number = 0;
  url : any ;
  mydates : any = '';

  constructor(public navCtrl : NavController, public sanitizer : DomSanitizer, public navParams : NavParams, public storage : Storage, public http : Http, public app : App, public toastCtrl : ToastController) {
    this.mydates = this
      .navParams
      .get('date');
    console.log(this.mydates);
    this.getData(this.mydates);
  }

  presentToast(mess) {
    let toast = this
      .toastCtrl
      .create({message: mess, duration: 1000, position: 'middle'});
    toast.present();
  }

  getData(a) {
    this.url = "https://api.nasa.gov/planetary/apod?api_key=" + this.api_key + "&date=" + a;
    console.log(this.url);
    this
      .http
      .get(this.url)
      .map(res => res.json())
      .subscribe(result => {
        this.currentdata = result;
        console.log(this.currentdata);
        if (this.currentdata.media_type) {
          this.presentToast('Data Retrieved successful');
        } else {
          this.presentToast('No Data Retrieved')
        }
      }, err => {
        this.presentToast('request timeout');
        console.log("Oops!");
      });
  }

  copyright(type, value) {
    if (value === null) {
      return type + " Credits: Public Domain";
    } else {
      return type + " Credits: " + value;
    }
  }

  trustSrc(type, url) {
    if (type === 'video') {
      return this
        .sanitizer
        .bypassSecurityTrustResourceUrl(url);
    } else if (type === 'image') {
      return this
        .sanitizer
        .bypassSecurityTrustUrl(url);
    } else {
      return this
        .sanitizer
        .bypassSecurityTrustResourceUrl(url);
    }

  }
}
