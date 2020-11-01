import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ForexComponent } from './forex.component';
import { ForexMenuComponent } from './forex-menu/forex-menu.component';


const routes: Routes = [
  {
    path: '',
    component: ForexComponent,
    children: [
      {
        path: 'forex-menu',
        component: ForexMenuComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class ForexRoutingModule {
}

