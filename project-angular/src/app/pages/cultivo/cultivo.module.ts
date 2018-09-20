import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { CultivoRoutingModule } from './cultivo-routing.module';
import { CultivoComponent } from './cultivo.component';
import { TabsComponent, Tab1Component, Tab2Component } from './tabs/tabs.component';


const components = [
  CultivoComponent,
  TabsComponent,
  Tab1Component,
  Tab2Component
];

@NgModule({
  imports: [
    ThemeModule,
    CultivoRoutingModule
  ],
  declarations: [
    ...components,
  ],
  entryComponents: [
    
  ],
})
export class CultivoModule { }
