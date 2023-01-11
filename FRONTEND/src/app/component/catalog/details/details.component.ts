import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AddProduct } from 'src/app/core/actions/ProductAction';
import { Product } from 'src/app/core/model/product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  id;
  product: Product;
  constructor(private route: ActivatedRoute, private service: ProductService, private store: Store, private router: Router) { }

  ngOnInit(): void {
    const connected = localStorage.getItem("connected");
    if (connected == "false") {
      this.router.navigate([""])
    }
    this.id = this.route.snapshot.paramMap.get('id');

    this.service.getProduct(this.id).subscribe({
      next: (product) => {
        this.product = product;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  addToShoppingList(product: Product) {
    this.store.dispatch(new AddProduct(product));
  }
}
