import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'home',
      component: HomeComponent,
    },
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'stocks',
      loadChildren: () => import('./stocks/stocks.module')
        .then(m => m.StocksModule),
    },
    {
      path: 'forex',
      loadChildren: () => import('./forex/forex.module')
        .then(m => m.ForexModule),
    },
    {
      path: 'crypto',
      loadChildren: () => import('./crypto/crypto.module')
        .then(m => m.CryptoModule),
    },
    {
      path: 'custom-basket',
      loadChildren: () => import('./custom-basket/custom-basket.module')
        .then(m => m.CustomBasketModule),
    },
    {
      path: 'extra-products',
      loadChildren: () => import('./extra-products/extra-products.module')
        .then(m => m.ExtraProductsModule),
    },
    {
      path: 'charts',
      loadChildren: () => import('./charts/charts.module')
        .then(m => m.ChartsModule),
    },
    {
      path: 'auth',
      loadChildren: () => import('./auth/auth.module')
        .then(m => m.AuthModule),
    },
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: HomeComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
