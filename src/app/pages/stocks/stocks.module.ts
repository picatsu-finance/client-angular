import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbAccordionModule,
  NbButtonModule,
  NbCardModule, NbInputModule,
  NbListModule,
  NbRouteTabsetModule, NbSelectModule,
  NbStepperModule,
  NbTabsetModule, NbUserModule
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { StocksRoutingModule } from './stocks-routing.module';
import { StocksComponent } from './stocks.component';
import { StocksMenuComponent } from './stocks-menu/stocks-menu.component';
import { ChartModule } from 'angular2-chartjs';
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbStepperModule,
    NbCardModule,
    NbButtonModule,
    NbListModule,
    NbAccordionModule,
    NbUserModule,
    StocksRoutingModule,
    ChartModule,
    NbSelectModule,
    NbInputModule,
    NgApexchartsModule
  ],
  declarations: [
    StocksComponent,
    StocksMenuComponent,
  ],
})
export class StocksModule { }
