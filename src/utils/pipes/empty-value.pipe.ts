import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emptyValue'
})
export class EmptyValuePipe implements PipeTransform {

  transform(value: any): unknown {
    if (value === null) {
      return 'Sin información'
    } else {
      return value;
    }
  }

}
