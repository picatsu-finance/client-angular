import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';

export const routes: Routes = [
  {
    path: '',
    component: AdminMenuComponent,
    children: [
      {
        path: 'admin',
        component: AdminMenuComponent, // <---
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class AdminRoutingModule {

}
