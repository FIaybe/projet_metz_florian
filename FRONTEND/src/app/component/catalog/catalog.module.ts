import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule, Routes } from '@angular/router';
import { SearchBarModule } from '../search-bar/search-bar.module';
import { DisplayCatalogComponent } from './catalog.component';
import { DetailsComponent } from './details/details.component';
import { ProductFormComponent } from './product-form/product-form.component';

const appChild: Routes = [
  {
    path: '',
    component: DisplayCatalogComponent,
  },
  {
    path: 'add',
    component: ProductFormComponent,
  },
  {
    path: 'detail/:id',
    component: DetailsComponent,
  }
];

@NgModule({
  declarations: [
    DisplayCatalogComponent,
    DetailsComponent,
    ProductFormComponent,
  ],
  imports: [
    RouterModule.forChild(appChild),
    CommonModule,
    MatDividerModule,
    MatCardModule,
    HttpClientModule,
    SearchBarModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
  ]
})
export class DisplayCatalogModule { }
