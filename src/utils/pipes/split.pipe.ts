import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'split'
})
export class SplitPipe implements PipeTransform {

  transform(input: any, separator: string = '|', limit?: number): any {
    if (!isString(input)) {
      return input;
    }

    return input.split(separator, limit);
  }

}

function isString(value: any): value is string {
  return typeof value === 'string';
}

