import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { GlobalService } from '../../providers/globals/globals';

@Component({
  selector: 'page-add',
  templateUrl: 'add.html'
})
export class AddPage {

  public data = {
    city: 'seoul'
  }
  public lang = this.globalService.lang;

  constructor(public view: ViewController, public globalService: GlobalService) {
  }

  dismiss(data) {
    this.view.dismiss(data);
  }
}
