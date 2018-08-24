import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { Station1Component } from './station1/station1.component';
import { GardenComponent } from './garden.component'



const routes: Routes = [{
  path: '',
  component: GardenComponent,
    children: [{
      path: 'station1',
      component: Station1Component,
    }],
  }];;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GardenRoutingModule { }
