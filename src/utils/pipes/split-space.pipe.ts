import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitSpace'
})
export class SplitSpacePipe implements PipeTransform {

  transform(input: any, separator: string = ' '): any {
    if (!isString(input)) {
      return input;
    }
    let strTransform: string = '';

    const arrayText = input.split(separator);

    if (arrayText.length > 1) {
      strTransform = arrayText[0] + ' ' + arrayText[1];
    } else {
      strTransform = arrayText[0];
    }

    return strTransform;
  }

}

function isString(value: any): value is string {
  return typeof value === 'string';
}
