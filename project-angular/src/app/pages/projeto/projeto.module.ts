import { NgModule } from '@angular/core';


import { ThemeModule } from '../../@theme/theme.module';

import { SmartTableService } from '../../@core/data/smart-table.service';

@NgModule({
  imports: [
    ThemeModule,
       
  ],
  declarations: [
    //...routedComponents,
  ],
  providers: [
    SmartTableService,
  ],
})
export class ProjetoModule { }
