import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StocksComponent } from './stocks.component';
import { StocksMenuComponent } from './stocks-menu/stocks-menu.component';

const routes: Routes = [{
  path: '',
  component: StocksComponent,
  children: [
    {
      path: 'stocks-menu',
      component: StocksMenuComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StocksRoutingModule {
}
