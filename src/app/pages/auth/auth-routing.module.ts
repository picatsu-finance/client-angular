import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NbAuthComponent } from '@nebular/auth';
import {LoginComponent} from "./login/login.component";  // <---

export const routes: Routes = [
  {
    path: '',
    component: NbAuthComponent,
    children: [

      {
        path: 'login',
        component: LoginComponent, // <---
      },
      {
        path: 'register',
        component: LoginComponent, // <---
      },
      {
        path: 'request-password',
        component: LoginComponent, // <---
      },
      {
        path: 'reset-password',
        component: LoginComponent, // <---
      },
      {
        path: 'profile',
        component: LoginComponent, // <---
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
