import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/core/model/product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  formgroup: FormGroup;

  product: Product = new Product();
  constructor(private formBuilder: FormBuilder, private router: Router, private service: ProductService) {
    this.formgroup = this.formBuilder.group({
      name: [''],
      description: [''],
      price: [''],
    });

    this.formgroup.valueChanges.subscribe({
      next: (value) => {
        this.product.name = value.name;
        this.product.description = value.description;
        this.product.price = value.price;
      }
    })
  }

  ngOnInit(): void {
    const connected = localStorage.getItem("connected");
    if (connected == "false") {
      this.router.navigate([""])
    }
  }

  onSubmit() {
    this.service.postProduct(this.product).subscribe((data) => {
      this.router.navigate(["/catalog"]);
    });
  }

}
