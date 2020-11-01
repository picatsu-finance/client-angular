import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExtraProductsComponent } from './extra-products.component';
import { ExtraProductMenuComponent } from './extra-product-menu/extra-product-menu.component';


const routes: Routes = [{
  path: '',
  component: ExtraProductsComponent,
  children: [
    {
      path: 'extra-product',
      component: ExtraProductMenuComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExtraProductsRoutingModule {
}
