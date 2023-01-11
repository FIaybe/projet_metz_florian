import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DisplayCatalogModule } from './component/catalog/catalog.module';
import { FooterComponent } from './component/footer/footer.component';
import { HeaderModule } from './component/header/header.module';
import { ApiHttpInterceptor } from './core/Interceptor/ApiHttpInterceptor';
import { ProductState } from './core/state/ProductState';
import { OnlyLetterDirective } from './directives/onlyLetter/only-letter.directive';
import { SpecificNumberDigitDirective } from './directives/specificNumberDigit/specific-number-digit.directive';
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    SpecificNumberDigitDirective,
    OnlyLetterDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([ProductState]),
    HeaderModule,
    DisplayCatalogModule,
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    { provide: HTTP_INTERCEPTORS, useClass: ApiHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
