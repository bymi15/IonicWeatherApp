import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';

import { CitiesPage } from '../pages/cities/cities';
import { SettingPage } from '../pages/setting/setting';
import { HomePage } from '../pages/home/home';
import { WeatherProvider } from '../providers/weather/weather';
import { StorageService } from '../providers/storage/storage';
import { GlobalService } from '../providers/globals/globals';
import { AddPage } from '../pages/add/add';
import { ForecastPage } from '../pages/forecast/forecast';
import { TemperaturePipe } from '../pipes/temperature';
import { LanguagePipe } from '../pipes/language';
import { WindspeedPipe } from '../pipes/windspeed';

@NgModule({
  declarations: [
    MyApp,
    CitiesPage,
    SettingPage,
    HomePage,
    AddPage,
    ForecastPage,
    TemperaturePipe,
    LanguagePipe,
    WindspeedPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      backButtonIcon: 'ios-arrow-back',
      iconMode: 'md',
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      pageTransition: 'ios-transition'
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CitiesPage,
    SettingPage,
    ForecastPage,
    HomePage,
    AddPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WeatherProvider,
    GlobalService,
    StorageService,
    Geolocation
  ]
})
export class AppModule {}
