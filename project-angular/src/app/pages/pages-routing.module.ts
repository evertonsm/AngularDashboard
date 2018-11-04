import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../auth-guard.service'
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { ProjetoComponent } from './projeto/projeto.component';
import { CultivoComponent } from './cultivo/cultivo.component';
import { ContatoComponent } from './contato/contato.component';
import { LogComponent } from './log/log.component';


const routes: Routes = [{
  path: '',
  component: PagesComponent,
  canActivate: [AuthGuard],
  children: [{
    path: 'dashboard',
    component: DashboardComponent,
  }, {
    path: 'garden',
    loadChildren: './garden/garden.module#GardenModule',
  }, {
    path: 'cultivo',
    component: CultivoComponent,

  }, {
    path: 'maps',
    loadChildren: './maps/maps.module#MapsModule',
  }, {
    path: 'projeto',
    component: ProjetoComponent,
  },
  {
    path: 'contato',
    component: ContatoComponent,
  },
  {
    path: 'log',
    component: LogComponent
  },
  /*{
    path: 'charts',
    loadChildren: './charts/charts.module#ChartsModule',
  }, {
    path: 'editors',
    loadChildren: './editors/editors.module#EditorsModule',
  }, {
    path: 'forms',
    loadChildren: './forms/forms.module#FormsModule',
  }, {
    path: 'tables',
    loadChildren: './tables/tables.module#TablesModule',
  }, {
    path: 'miscellaneous',
    loadChildren: './miscellaneous/miscellaneous.module#MiscellaneousModule',
  }, */
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: '**',
    component: NotFoundComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
