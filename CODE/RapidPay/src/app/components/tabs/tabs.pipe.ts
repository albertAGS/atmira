import { Pipe, PipeTransform } from '@angular/core';
import { ITab } from './tab.interface';

@Pipe({
  name: 'tabs'
})
export class TabsPipe implements PipeTransform {

  transform(value: ITab[], variables: {'isOpened': boolean, 'end': number, 'start':number}): ITab[] {
    if (variables.isOpened) {
      return value.slice(variables.start, variables.end)
    } else {
      return value;
    }
  }

}
