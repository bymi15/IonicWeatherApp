import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import $ from 'jquery';

@Injectable()
export class GlobalService {
  public lang:string = "en";
  public loading;

  constructor(public loadingCtrl: LoadingController) {
  }

  public showLoading(){
    this.loading = this.loadingCtrl.create({
      content: 'Loading...'
    });
    this.loading.present();
  }

  public hideLoading(){
    this.loading.dismissAll();
  }

  //https://www.pexels.com/search/rain/
  public smartBgImg(state){
    if(state==='rain'){
      this.changeBgImg("https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80");
      this.changeBgBlur(1);
      this.changeBgDarkness(0.5);
    }else if(state==='snow'){
      this.changeBgImg("https://cdn.pixabay.com/photo/2018/12/09/09/15/christmas-3864552_960_720.jpg");
      this.changeBgBlur(5);
      this.changeBgDarkness(0.2);
    }else if(state==='snowymountain'){
      this.changeBgImg("https://images.pexels.com/photos/326057/pexels-photo-326057.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260");
      this.changeBgBlur(4);
      this.changeBgDarkness(0.3);
    }else if(state==='sunset'){
      this.changeBgImg("https://pics.freeartbackgrounds.com/midle/Seascape_after_Sunset_Background-990.jpg");
      this.changeBgBlur(1);
      this.changeBgDarkness(0.5);
    }else if(state==='sunny'){
      this.changeBgImg("https://i.pinimg.com/originals/68/5c/84/685c84cea4c2c3b133c9b2521448a934.jpg");
      this.changeBgBlur(2);
      this.changeBgDarkness(0.2);
    }else if(state==='night'){
      this.changeBgImg("https://images.unsplash.com/photo-1502657877623-f66bf489d236?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80");
      this.changeBgDarkness(0.1);
    }else if(state==='cloudy-day'){
      this.changeBgImg("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5jVgBxq1YwK4V5f-lf-4q91S4_d9y6EtjDsXeswpLQ1Y-1HFgyw");
      this.changeBgBlur(7);
      this.changeBgDarkness(0.2);
    }else if(state==='cloudy-night'){
      this.changeBgImg("https://images.pexels.com/photos/158163/clouds-cloudporn-weather-lookup-158163.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260");
      this.changeBgBlur(7);
      this.changeBgDarkness(0.4);
    }else if(state==='misty'){
      this.changeBgImg("https://images.pexels.com/photos/1287083/pexels-photo-1287083.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260");
      this.changeBgBlur(4);
      this.changeBgDarkness(0.3);
    }
  }

  public changeBgDarkness(n){
    $(".darknessfilter").css('opacity', n);
  }

  public changeBgBlur(n){
    $(".homebg").css('filter', 'blur(' + n + 'px)');
  }

  public changeBgImg(url){
    $(".homebg").css('background-image', "url('" + url + "')");
  }

}