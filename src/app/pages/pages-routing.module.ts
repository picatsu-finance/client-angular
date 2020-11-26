import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminMenuComponent } from './admin/admin-menu/admin-menu.component';
import { AuthguardService } from './auth/_helpers/authguard.service';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'admin',
      canActivate: [AuthguardService],
      loadChildren: () => import('./admin/admin.module')
        .then(m => m.AdminModule),
    },
    {
      path: 'admin',
      component: AdminMenuComponent,
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
      path: 'auth',
      loadChildren: () => import('./auth/auth.module')
        .then(m => m.AuthModule),
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: DashboardComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
