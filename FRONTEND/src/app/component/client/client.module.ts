import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, Routes } from '@angular/router';
import { PhoneFormatPipe } from 'src/app/pipe/phone-format.pipe';
import { ClientFormComponent } from './client-form/client-form.component';
import { DisplayClientComponent } from './display-client/display-client.component';

import { MatTableModule } from '@angular/material/table';
const appChild: Routes = [
  {
    path: '',
    component: DisplayClientComponent,
  },
  {
    path: 'add',
    component: ClientFormComponent,
  },
];

@NgModule({
  declarations: [
    ClientFormComponent,
    DisplayClientComponent,
    PhoneFormatPipe,
  ],
  imports: [
    RouterModule.forChild(appChild),
    CommonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatTableModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
  ]
})
export class ClientModule { }
