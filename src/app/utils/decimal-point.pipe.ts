import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimalPoint',
  standalone: true
})
export class DecimalPointPipe implements PipeTransform {

  transform(value: number): string {
    let str = value.toString() || '0';

    if (str.length < 2) return `0,${value}`;
    return str.slice(0, -1) + ',' + str.slice(-1);
  }

}
