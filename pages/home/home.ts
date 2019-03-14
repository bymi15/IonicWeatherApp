//https://scdn.androidcommunity.com/wp-content/uploads/2016/02/Sony-Weather-app-for-Xperia.jpg
//https://media.idownloadblog.com/wp-content/uploads/2017/04/TransparentWeather.jpg
//https://www.xda-developers.com/files/2018/05/google-weather.png
//https://cdn.ndtv.com/tech/images/gadgets/yahoo-weather-app-01-635.jpg?output-quality=80
//https://cdn-images-1.medium.com/max/1600/1*VDsw4qpg3vgP9ccHyozQMA.png

//alternative weather APIs
//https://www.worldweatheronline.com/developer/api/
//https://www.weatherbit.io

import { Component, ViewEncapsulation } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather';
import { Geolocation } from '@ionic-native/geolocation';
import { TemperaturePipe } from '../../pipes/temperature';
import { WindspeedPipe } from '../../pipes/windspeed';
import { CitiesPage } from '../cities/cities';
import { SettingPage } from '../setting/setting';
import { ForecastPage } from '../forecast/forecast';
import { GlobalService } from '../../providers/globals/globals';
import $ from 'jquery';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  styleUrls: [ './home.scss' ]
})
export class HomePage {

  public isRoot = true;
  public weather;
  public city;
  public currentTime;
  public forecast = [];
  public forecastFull = [];
  public dailyForecast = [];
  public lang = this.globalService.lang;
  public iconDayOrNight;

  constructor(public navCtrl: NavController, public navParams: NavParams, private weatherProvider:WeatherProvider, private geo: Geolocation, public globalService: GlobalService) {
    if(navParams.get('cityWeather')){
      this.city = navParams.get('cityWeather').name;
      this.isRoot = false;
    }
  }

  ionViewWillEnter(){
    this.globalService.showLoading();
    if(this.isRoot){
      this.city = 'Pohang';
      //this.getLocalWeather();
    }
    this.weatherProvider.getWeatherByCity(this.city).subscribe(weather => {
      this.weather = weather;
      this.update();
      this.getForecast(this.weather.id);
      console.log(this.weather);
    });
    

  }

  update(){
    let state = 'sunny';

    let today = new Date();
    let timeNow = today.getTime();
    this.currentTime = timeNow;

    let hour = today.getHours();
    if (hour > 6 && hour < 17) {
      this.iconDayOrNight = 'day';
      state = 'sunny';
    }else if (hour >= 17 && hour < 20){
      this.iconDayOrNight = 'day';
      state = 'sunset'
    }else{
      this.iconDayOrNight = 'night';
      state = 'night';
    }

    if(this.weather){
      let weatherDesc = this.weather.weather[0].main.toLowerCase();
      if(weatherDesc === 'rain'){
        state = 'rain';
      }else if(weatherDesc === 'snow'){
        state = 'snow';
      }else if(weatherDesc === 'clouds'){
        state = 'cloudy-' + this.iconDayOrNight;
      }else if(weatherDesc === 'haze' || weatherDesc === 'mist'){
        state = 'misty';
      }
    }
    
    this.globalService.smartBgImg(state);
  }

  getLocalWeather(){
    this.geo.getCurrentPosition().then( pos => {
      let res = [];
      res.push(pos.coords.latitude);
      res.push(pos.coords.longitude);
      return res;
    }).then( res => {
      this.weatherProvider.getWeatherByPos(res[0], res[1]).subscribe(weather => {
        this.weather = weather;
        console.log(this.weather);
      });
    }).catch( err => console.log(err) );
  }

  getForecast(cityId){
    this.forecast = [];
    this.forecastFull = [];
    this.weatherProvider.forecast(cityId).subscribe(data => {
      data.list.sort((a, b) => parseInt(a.dt) - parseInt(b.dt));
      console.log(data);
      for(var i = 0; i < data.list.length; i++){
        if(i < 5){
          this.forecast.push(data.list[i]);
        }
        this.forecastFull.push(data.list[i]);
      }
      this.calcDailyForecast();
      this.globalService.hideLoading();
    }, err => console.log(err));
  }

  calcDailyForecast(){
    this.dailyForecast = [];
    let sumTempMax = 0;
    let sumTempMin = 0;
    let maxDays = 5;
    let count = 0;
    let currentDay = new Date(this.forecastFull[0].dt * 1000).getDate();
    for(var i = 0; i < this.forecastFull.length; i++){
      if(maxDays === 0){
        break;
      }
      let nextDay = new Date(this.forecastFull[i].dt * 1000).getDate();
      if(i === this.forecastFull.length - 1){
        sumTempMax += this.forecastFull[i].main.temp_max;
        sumTempMin += this.forecastFull[i].main.temp_min;
        count++;
        let data = {
          dt: this.forecastFull[i].dt,
          temp_max: Math.round(sumTempMax / count),
          temp_min: Math.round(sumTempMin / count),
          icon: this.forecastFull[i - Math.round(count / 2)].weather[0].id,
          count: count
        };
        this.dailyForecast.push(data);
      }else if(currentDay === nextDay){
        sumTempMax += this.forecastFull[i].main.temp_max;
        sumTempMin += this.forecastFull[i].main.temp_min;
        count++;
      }else{
        maxDays--;
        currentDay = new Date(this.forecastFull[i].dt * 1000).getDate();
        let data = {
          dt: this.forecastFull[i-1].dt,
          temp_max: Math.round(sumTempMax / count),
          temp_min: Math.round(sumTempMin / count),
          icon: this.forecastFull[i - Math.round(count / 2)].weather[0].id,
          count: count
        };
        this.dailyForecast.push(data);
        
        sumTempMax = this.forecastFull[i].main.temp_max;
        sumTempMin = this.forecastFull[i].main.temp_min;
        count = 1;
      }
    }
      console.log(this.dailyForecast);
  }

  viewFullForecast(weather){
    this.navCtrl.push(ForecastPage, { forecast: this.forecastFull, city: weather.name });
  }

}
