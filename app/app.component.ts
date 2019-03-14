import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { CitiesPage } from '../pages/cities/cities';
import { SettingPage } from '../pages/setting/setting';

@Component({
  templateUrl: 'app.html',
  styleUrls: [ './app.scss' ]
})
export class MyApp {
  @ViewChild('content') nav: NavController;

  rootPage:any = HomePage;
  pages: Array<{title: string, component: any}>

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.pages = [
        { title: 'Home', component: HomePage },
        { title: 'Cities', component: CitiesPage },
        { title: 'Settings', component: SettingPage }
      ];
    });
  }
  
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}