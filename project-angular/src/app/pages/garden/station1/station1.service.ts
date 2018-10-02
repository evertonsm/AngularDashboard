import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import 'rxjs/add/operator/toPromise';



import { Station } from './station.model';



@Injectable()

export class Station1Service {



  selectedStation: Station;

  station: Station[];

  value: boolean;

  teste: Station;



  readonly baseURL = 'http://0.0.0.0:8000/stations/';



  constructor(private http: HttpClient) { }



  getStation(name: string): Observable<Station[]> {

    return this.http.get<Station[]>(this.baseURL + name);



  }



  setStation(station2: Station) {





    this.http.post(this.baseURL + name,
      {
        name: station2.name,
        irrigation: station2.irrigation,
        humidity: station2.humidity
      }
    ).subscribe(

      data => {

        alert('Estado da bomba = ' + station2.irrigation);

      },

      error => {

        console.log(JSON.stringify(error.json()));

      }

    )



  }



}