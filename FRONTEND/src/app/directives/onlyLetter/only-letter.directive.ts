import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[onlyLetter]'
})
export class OnlyLetterDirective {

  constructor(private el: ElementRef) {
    //only letters
    this.el.nativeElement.onkeypress = (evt) => {
      if (evt.which < 65 || evt.which > 122) {
        evt.preventDefault();
        this.el.nativeElement.style.backgroundColor = 'red';
      }
      else {
        this.el.nativeElement.style.backgroundColor = 'white';
      }
    }
  }

}
