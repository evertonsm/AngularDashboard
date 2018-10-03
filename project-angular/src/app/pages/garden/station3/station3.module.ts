import { NgModule } from '@angular/core';

import { ThemeModule } from '../../../@theme/theme.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { Station3Component } from './station3.component'
import { SensorComponent } from './sensor/sensor.component';
import { TemperatureDraggerComponent } from './sensor/temperature-dragger/temperature-dragger.component';
import { StatusCardComponent} from './status-card/status-card.component'
import { ToasterModule, ToasterService } from 'angular2-toaster';


@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
    ToasterModule
           
  ],
  declarations: [
    SensorComponent,
    TemperatureDraggerComponent,
    Station3Component,
    StatusCardComponent,
    
  ],
})
export class Station3Module { }


