import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat'
})
export class PhoneFormatPipe implements PipeTransform {

  transform(number) {

    let newStr = "+33 " + number.substr(1, 1) + '.' + number.substr(2, 2) + '.' + number.substr(4, 2) + '.' + number.substr(6, 2) + '.' + number.substr(8, 2);
    return newStr

  }

}
