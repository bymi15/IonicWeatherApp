import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GlobalService } from '../../providers/globals/globals';
import { ToastController } from 'ionic-angular';
import { LanguagePipe } from '../../pipes/language';

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class SettingPage {

  public lang = this.globalService.lang;
  public data;

  constructor(public navCtrl: NavController, public globalService: GlobalService, public toastCtrl: ToastController) {
    this.data = this.globalService.lang.toString();
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Language successfully updated!',
      duration: 2500,
      position: 'top',
      showCloseButton: true
    });

    toast.present();
  }

  updateLanguage(data){
    this.globalService.lang = data;
    this.lang = data;
    this.data = data;
    this.presentToast();
  }

}
