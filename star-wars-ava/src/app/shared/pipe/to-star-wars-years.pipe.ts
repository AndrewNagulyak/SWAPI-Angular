import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'toStarWarsYears'
})
export class ToStarWarsYearsPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return Math.abs(value[0]) + (value[0] > 0 ? 'ABY' : 'BBY') + ' - ' + Math.abs(value[1])
      + (value[1] > 0 ? 'ABY' : 'BBY');
  }

}
