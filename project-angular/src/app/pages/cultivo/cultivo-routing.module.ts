import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CultivoComponent } from './cultivo.component';
import { TabsComponent, Tab1Component, Tab2Component } from './tabs/tabs.component';

const routes: Routes = [{
  path: '',
  component: CultivoComponent,
  children: [{
    path: 'tabs',
    component: TabsComponent,
    children: [{
      path: '',
      redirectTo: 'tab1',
      pathMatch: 'full',
    }, {
      path: 'tab1',
      component: Tab1Component,
    }, {
      path: 'tab2',
      component: Tab2Component,
    }],
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CultivoRoutingModule { }
