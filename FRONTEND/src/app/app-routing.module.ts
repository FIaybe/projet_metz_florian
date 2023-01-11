import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'welcome', loadChildren: () => import('./component/welcome/welcome.module').then(m => m.WelcomeModule) },
  { path: '', loadChildren: () => import('./component/login/login.module').then(m => m.LoginModule) },
  { path: 'client', loadChildren: () => import('./component/client/client.module').then(m => m.ClientModule) },
  { path: 'catalog', loadChildren: () => import('./component/catalog/catalog.module').then(m => m.DisplayCatalogModule) },
  { path: 'basket', loadChildren: () => import('./component/basket/basket.module').then(m => m.BasketModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
