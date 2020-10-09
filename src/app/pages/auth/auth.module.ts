import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthRoutingModule } from './auth-routing.module';
import { NbAuthModule } from '@nebular/auth';
import {
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule,
} from '@nebular/theme';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './register/register.component';
import { RequestpasswordComponent } from './requestpassword/requestpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ProfilComponent } from './profil/profil.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    AuthRoutingModule,

    NbAuthModule,
  ],
  declarations: [
    // ... here goes our new components
  LoginComponent,
    AuthComponent,
    RegisterComponent,
    RequestpasswordComponent,
    ResetpasswordComponent,
    ProfilComponent],
})
export class AuthModule { }
