import { Component } from '@angular/core';

import * as L from 'leaflet';
import 'style-loader!leaflet/dist/leaflet.css';

@Component({
  selector: 'ngx-leaflet',
  styleUrls: ['./leaflet.component.scss'],
  template: `
    <nb-card>
      <nb-card-header>Leaflet Maps</nb-card-header>
      <nb-card-body>
        <div leaflet [leafletOptions]="options"></div>
      </nb-card-body>
    </nb-card>
  `,
})
export class LeafletComponent {
  
  options = {
    layers: [
      
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 22, attribution: '...' }),
      //L.marker([-22.2573777, -45.6961486]).bindPopup('Inatel').openPopup(),
      L.circle([ -22.2570273, -45.6960272 ], { radius: 120 }),
      L.circle([ -22.1980059, -45.7430668 ], { radius: 120 }),   
        
    ],
    zoom: 14,
    center: L.latLng({ lat: -22.2573777, lng: -45.6961486 }),
  };

  layersControl = {
    baseLayers: {
      'Open Street Map': L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
      'Open Cycle Map': L.tileLayer('http://{s}.tile.opencyclemap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    },
    overlays: {
      'Big Circle': L.circle([ -22.2573777, -45.6961486 ], { radius: 50 }),
      'Big Square': L.polygon([[ 46.8, -121.55 ], [ 46.9, -121.55 ], [ 46.9, -121.7 ], [ 46.8, -121.7 ]])
    }
  }

 
  
}
