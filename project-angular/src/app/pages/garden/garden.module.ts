import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';

import { GardenRoutingModule } from './garden-routing.module';
import { GardenComponent } from './garden.component';
import { Station1Module } from './station1/station1.module';
import { Station2Module } from './station2/station2.module';
import { Station3Module } from './station3/station3.module';


const PAGES_COMPONENTS = [
  GardenComponent,
  
];

@NgModule({
  imports: [
    ThemeModule,
    GardenRoutingModule,
    Station1Module,
    Station2Module,
    Station3Module
       
  ],
  declarations: [
    ...PAGES_COMPONENTS,
    
  ],
  
})
export class GardenModule { }
