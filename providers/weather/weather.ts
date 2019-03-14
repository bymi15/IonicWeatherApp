import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../globals/globals';
import 'rxjs/add/operator/map';
//https://openweathermap.org
//eg. http://api.openweathermap.org/data/2.5/weather?q=Pohang&units=metric&APPID=f402aab9bbcb1e1b6541996f5aa99694

@Injectable()
export class WeatherProvider {
  private apiKey = 'f402aab9bbcb1e1b6541996f5aa99694';
  private baseUrl = 'https://api.openweathermap.org/data/2.5/';

  constructor(public http: HttpClient, public globalService: GlobalService) {
    console.log('WeatherProvider loaded');
  }

  getWeatherByCity(city){
    let url = this.baseUrl + 'weather?q=' + city + '&units=metric&APPID=' +  this.apiKey;
    if(this.globalService.lang === 'kr'){
      url = url + '&lang=kr';
    }
    return this.http.get(url);
  }

  getWeatherByPos(lat, lng){
    let url = this.baseUrl + 'weather?lat=' + lat + '&lon=' + lng + '&units=metric&APPID=' +  this.apiKey;
    if(this.globalService.lang === 'kr'){
      url = url + '&lang=kr';
    }
    return this.http.get(url);
  }

  forecast(cityId: string){ //5day-3hour forecast
    let url = this.baseUrl + 'forecast?id=' + cityId + '&units=metric&APPID=' + this.apiKey;
    if(this.globalService.lang === 'kr'){
      url = url + '&lang=kr';
    }
    return this.http.get(url);
  }
}