import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, Routes } from '@angular/router';
import { BasketComponent } from './basket.component';

const appChild: Routes = [
  {
    path: '',
    component: BasketComponent,
  },
]

@NgModule({
  declarations: [BasketComponent],
  imports: [
    RouterModule.forChild(appChild),
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class BasketModule { }
