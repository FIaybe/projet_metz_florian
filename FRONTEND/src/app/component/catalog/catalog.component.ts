import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AddProduct } from 'src/app/core/actions/ProductAction';
import { Product } from 'src/app/core/model/product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class DisplayCatalogComponent implements OnInit {
  products: Product[];

  model: Observable<any>;
  searchField$: Observable<string>;
  @ViewChild('input', { static: true }) input: ElementRef;


  constructor(private service: ProductService, private store: Store, private router: Router) {
  }

  ngOnInit(): void {
    const connected = localStorage.getItem("connected");
    if (connected == "false") {
      this.router.navigate([""])
    }
    this.getProducts();
  }

  getProducts() {
    this.service.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  filterResult($event) {
    this.products = $event;
  }

  addToShoppingList(product: Product) {
    this.store.dispatch(new AddProduct(product));
  }

}
