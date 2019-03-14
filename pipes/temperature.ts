import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperature'
})
export class TemperaturePipe implements PipeTransform {

  transform(value: string, args?: any): string {
    var rounded = Math.round(parseInt(value, 10));
    return rounded.toString() + '°';
  }

}