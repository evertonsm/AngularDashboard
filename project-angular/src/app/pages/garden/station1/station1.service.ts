import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import 'rxjs/add/operator/toPromise';



import { Station } from './station.model';



@Injectable()

export class Station1Service {

<<<<<<< HEAD


  selectedStation: Station;

  station: Station[];

  value: boolean;

  teste: Station;



  readonly baseURL = 'http://131.221.243.115:8000/stations/';



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

=======
    selectedStation: Station;
    station: Station[];
    value: boolean;
    teste: Station;
    
    readonly baseURL = 'http://131.221.243.115:8000/stations/';

    constructor(private http: HttpClient) { }
    
    getStation(name: string): Observable<Station[]>
    {   
        return  this.http.get<Station[]>(this.baseURL+name);
        
    }

    setStation(station2: Station)
    {   
       
        
        this.http.post(this.baseURL+name,
      JSON.stringify(station2)).subscribe(
>>>>>>> 696b8f2213ec68dc701b93edb4b7c7e3a30288a0
      data => {

        alert('Estado da bomba = ' + station2.irrigation);

      },

      error => {

        console.log(JSON.stringify(error.json()));

      }

    )



  }



}