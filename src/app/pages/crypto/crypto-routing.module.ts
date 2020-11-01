import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CryptoComponent } from './crypto.component';
import { CryptoMenuComponent } from './crypto-menu/crypto-menu.component';


const routes: Routes = [{
  path: '',
  component: CryptoComponent,
  children: [ {
    path: 'crypto-menu',
    component: CryptoMenuComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CryptoRoutingModule { }
