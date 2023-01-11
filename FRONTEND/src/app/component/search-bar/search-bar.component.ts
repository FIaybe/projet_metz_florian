import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  search = new FormControl('');
  @Input() list: any[];

  @Output() filterResult = new EventEmitter<any[]>();
  @Output() filterReset = new EventEmitter();


  constructor(private service: ProductService) {
    this.search.valueChanges.subscribe((value) => {
      if (value == '') {
        this.filterReset.emit();
      }
      else {
        this.service.getProductFromTerm(value).subscribe((data) => {
          this.filterResult.emit(data);
        });
      }
    });
  }

}
