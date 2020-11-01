import { NgModule } from '@angular/core';
import {
  NbButtonModule,
  NbCardModule,
  NbProgressBarModule,
  NbTabsetModule,
  NbUserModule,
  NbIconModule,
  NbSelectModule,
  NbListModule, NbInputModule, NbSidebarModule,
} from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { ChartModule } from 'angular2-chartjs';
import { HomeDisplayComponent } from './home-display/home-display.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import {FormsModule} from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ShowcaseDialogComponent } from './showcase-dialog/showcase-dialog.component';
import { NgMarqueeModule } from 'ng-marquee';

@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbIconModule,
    NbInputModule,
    NbTabsetModule,
    NbSelectModule,
    NbListModule,
    ChartModule,
    NbProgressBarModule,
    NgxEchartsModule,
    NgxChartsModule,
    LeafletModule,
    FormsModule,
    Ng2SmartTableModule,
    NbSidebarModule,
    NgMarqueeModule,
  ],
  declarations: [
    DashboardComponent,
    HomeDisplayComponent,
    ShowcaseDialogComponent,
  ],
  providers: [
  ],
  exports: [
  ],
})
export class DashboardModule { }
