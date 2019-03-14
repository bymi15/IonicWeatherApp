import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class StorageService {
  private key = 'citylist';
  private cities: Array<String>;

  //stores weather list as a single JSON string

  constructor(public storage: Storage) {
    storage.ready().then(() => {
      this.getCities().then(data => {
        this.cities = JSON.parse(data);
        console.log('SQL Storage Service Loaded');
      });
    });
  }

  getCities(){
    return this.storage.get(this.key);
  }

  removeCity(index){
    this.cities.splice(index, 1);
    this.storage.set(this.key, JSON.stringify(this.cities));
  }

  addCity(city){
    if(!this.cities){
      this.cities = [city];
    }else{
      this.cities.push(city);
    }
    this.storage.set(this.key, JSON.stringify(this.cities));
  }
}