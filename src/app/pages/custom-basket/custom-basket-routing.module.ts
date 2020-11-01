import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomBasketComponent } from './custom-basket.component';
import { CustomBasketMenuComponent } from './custom-basket-menu/custom-basket-menu.component';


const routes: Routes = [{
  path: '',
  component: CustomBasketComponent,
  children: [
    {
      path: 'custom-menu',
      component: CustomBasketMenuComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomBasketRoutingModule {
}


