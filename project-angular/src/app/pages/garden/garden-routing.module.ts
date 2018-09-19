import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Station1Component } from './station1/station1.component';
import { Station2Component } from './station2/station2.component';
import { Station3Component } from './station3/station3.component';
import { GardenComponent } from './garden.component';




const routes: Routes = [{
  path: '',
  component: GardenComponent,
    children: [{
      path: 'station1',
      component: Station1Component,
    },{
      path: 'station2',
      component: Station2Component,
    },{
      path: 'station3',
      component: Station3Component,
    }],
  }];;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GardenRoutingModule { }
