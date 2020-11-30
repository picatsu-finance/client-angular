import { NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule, NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
} from '@nebular/theme';


import { ThemeModule } from '../../@theme/theme.module';
import { ForexRoutingModule } from './forex-routing.module';
import { ForexComponent } from './forex.component';
import { ForexMenuComponent } from './forex-menu/forex-menu.component';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'angular2-chartjs';

@NgModule({
  imports: [
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    ForexRoutingModule,
    NbSelectModule,
    NbIconModule,
    FormsModule,
    ChartModule

  ],
  declarations: [
    ForexComponent,
    ForexMenuComponent,
  ],
})
export class ForexModule { }
