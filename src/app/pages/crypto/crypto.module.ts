import { NgModule } from '@angular/core';
import { NbAlertModule, NbCardModule, NbIconModule, NbPopoverModule, NbSearchModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { CryptoRoutingModule } from './crypto-routing.module';
import { CryptoComponent } from './crypto.component';
import { CryptoMenuComponent } from './crypto-menu/crypto-menu.component';


const components = [
  CryptoComponent,
  CryptoMenuComponent,
];

@NgModule({
  imports: [
    NbCardModule,
    NbPopoverModule,
    NbSearchModule,
    NbIconModule,
    NbAlertModule,
    ThemeModule,
    CryptoRoutingModule,
  ],
  declarations: [
    ...components,
  ],
})
export class CryptoModule { }
