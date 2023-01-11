import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[specificNumberDigit]'
})
export class SpecificNumberDigitDirective {

  @Input() size;

  constructor(private el: ElementRef) {
    this.el.nativeElement.onkeypress = (evt) => {
      if (evt.which < 48 || evt.which > 57) {
        evt.preventDefault();
      }
      if (this.el.nativeElement.value.length >= this.size) {
        evt.preventDefault();
      }
      if (this.el.nativeElement.value.length < this.size) {
        this.el.nativeElement.style.backgroundColor = 'red';
      }
      else {
        this.el.nativeElement.style.backgroundColor = 'white';
      }
    }
  }

}
