import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbDialogModule,
    NbInputModule, NbListModule,
    NbPopoverModule,
    NbSelectModule,
    NbTabsetModule,
    NbTooltipModule,
    NbWindowModule,
} from '@nebular/theme';

// modules
import { ThemeModule } from '../../@theme/theme.module';
import { CustomBasketRoutingModule } from './custom-basket-routing.module';

// components
import { CustomBasketComponent } from './custom-basket.component';
import { CustomBasketMenuComponent } from './custom-basket-menu/custom-basket-menu.component';

const COMPONENTS = [
  CustomBasketComponent,
  CustomBasketMenuComponent,
];

const MODULES = [
  FormsModule,
  ThemeModule,
  CustomBasketRoutingModule,
  NbDialogModule.forChild(),
  NbWindowModule.forChild(),
  NbCardModule,
  NbCheckboxModule,
  NbTabsetModule,
  NbPopoverModule,
  NbButtonModule,
  NbInputModule,
  NbSelectModule,
  NbTooltipModule,
];

const SERVICES = [
];

@NgModule({
    imports: [
        ...MODULES,
        NbListModule,
    ],
  declarations: [
    ...COMPONENTS,
  ],
  providers: [
    ...SERVICES,
  ],
})
export class CustomBasketModule {
}
