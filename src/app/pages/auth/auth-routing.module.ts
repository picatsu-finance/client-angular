import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NbAuthComponent } from '@nebular/auth';
import {LoginComponent} from "./login/login.component";
import { RegisterComponent } from './register/register.component';
import { RequestpasswordComponent } from './requestpassword/requestpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ProfilComponent } from './profil/profil.component';  // <---

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
        component: RegisterComponent, // <---
      },
      {
        path: 'request-password',
        component: RequestpasswordComponent, // <---
      },
      {
        path: 'reset-password',
        component: ResetpasswordComponent, // <---
      },
      {
        path: 'profile',
        component: ProfilComponent, // <---
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
