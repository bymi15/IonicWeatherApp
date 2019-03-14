//https://www.youtube.com/watch?v=P6SLf6jmXS0
//canvas drawing app tutorial

//https://www.youtube.com/watch?v=fKyf_esYgcA
//note taking app tutorial

//https://www.youtube.com/watch?v=VUNkjQ_k2Uc
//real time chat firebase tutorial

//https://market.ionicframework.com/themes/ionmyweather

import { Component } from '@angular/core';
import { ModalController, NavController, LoadingController } from 'ionic-angular';
import { AddPage } from '../add/add';
import { HomePage } from '../home/home';
import { WeatherProvider } from '../../providers/weather/weather';
import { TemperaturePipe } from '../../pipes/temperature';
import { StorageService } from '../../providers/storage/storage';
import { GlobalService } from '../../providers/globals/globals';

@Component({
  selector: 'page-cities',
  templateUrl: 'cities.html',
  styleUrls: [ './cities.scss' ],
})
export class CitiesPage {
  public weatherList = [];
  public cityList = [];
  public lang = this.globalService.lang;
  public loading;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public weatherProvider: WeatherProvider, public storage: StorageService, public globalService: GlobalService, public loadingCtrl: LoadingController) {
  }

  ionViewWillEnter(){
    this.getStoredCities();
  }

  showLoading(){
    this.loading = this.loadingCtrl.create({
      content: 'Loading...'
    });
    this.loading.present();
  }

  hideLoading(){
    this.loading.dismissAll();
  }

  getStoredCities(){
    this.showLoading();
    this.storage.getCities().then((cities) => {
      this.cityList = JSON.parse(cities) || [];
      this.loadWeathers();
    });
  }

  loadWeathers(){
    let itemsProcessed = 0;
    this.cityList.forEach((city, i) => {
      this.weatherProvider.getWeatherByCity(city).subscribe(data => {
        this.weatherList[i] = data;
        itemsProcessed++;
        if(itemsProcessed === this.cityList.length) { //done loading
          this.hideLoading();
        }
      });
    });
    if(this.cityList.length===0){
      this.hideLoading();
    }
  }

  addCityWeather(){
    let addWeatherModal = this.modalCtrl.create(AddPage);
    addWeatherModal.onDidDismiss( (data) =>{
      if(data){
        this.weatherProvider.getWeatherByCity(data.city).subscribe(res => {
          this.weatherList.push(res);
        });
        this.storage.addCity(data.city);
      }
    });
    addWeatherModal.present();
  }

  removeWeather(weather){
    let index = this.weatherList.indexOf(weather);
    this.weatherList.splice(index, 1);
    this.storage.removeCity(index);
  }

  viewWeather(cityWeather){
    this.navCtrl.push(HomePage, { cityWeather: cityWeather });
  }
}
