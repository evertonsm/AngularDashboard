import { NgModule } from '@angular/core';

import { NgxEchartsModule } from 'ngx-echarts';
import { ThemeModule } from '../../@theme/theme.module';

import { LogComponent } from './log.component';

import { ToasterModule, ToasterService } from 'angular2-toaster';

@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
    ToasterModule,
       
  ],
  declarations: [
    LogComponent,
  ],
})
export class ProjetoModule { }