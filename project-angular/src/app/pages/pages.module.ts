import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { GardenModule} from './garden/garden.module';
import { CultivoModule} from './cultivo/cultivo.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { ProjetoModule } from './projeto/projeto.module';
import { ProjetoComponent } from './projeto/projeto.component';
import { CultivoComponent } from './cultivo/cultivo.component';
import { ContatoComponent } from './contato/contato.component';
import { ContatoModule} from './contato/contato.module';
import { LogComponent } from './log/log.component';


const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    MiscellaneousModule,
    GardenModule,
    CultivoModule,
    ProjetoModule,
    ContatoModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
    ProjetoComponent,
    CultivoComponent,
    ContatoComponent,
    LogComponent,
  ],
})
export class PagesModule {
}
