// https://openweathermap.org/img/w/10d.png


import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TemperaturePipe } from '../../pipes/temperature';
import { WeatherProvider } from '../../providers/weather/weather';
import { GlobalService } from '../../providers/globals/globals';

@Component({
  selector: 'page-forecast',
  templateUrl: 'forecast.html',
  styleUrls: [ './forecast.scss' ]
})
export class ForecastPage {
  public city;
  public forecast = [];
  public lang = this.globalService.lang;

  constructor(public navCtrl: NavController, public navParams: NavParams, public weatherProvider: WeatherProvider, public globalService: GlobalService) {
    this.forecast = navParams.get('forecast');
    this.city = navParams.get('city');
  }

}
