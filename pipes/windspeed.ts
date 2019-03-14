import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wind'
})
export class WindspeedPipe implements PipeTransform {

  transform(value: string, args?: any): string {
    var res = (parseFloat(value)).toFixed(1);
    return res.toString() + ' m/s';
  }

}