import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Station } from './station.model';

@Injectable()
export class Station2Service {

    selectedStation: Station;
    station: Station[];
    value: boolean;
<<<<<<< HEAD

<<<<<<< HEAD
    readonly baseURL = 'http://131.221.243.115:8000/stations/';
=======
    readonly baseURL = 'http://localhost:8000/stations/';
=======
    
    readonly baseURL = 'http://131.221.243.115:8000/stations/';
>>>>>>> 696b8f2213ec68dc701b93edb4b7c7e3a30288a0
>>>>>>> 7dbed8f33f7cd78fd2deca117f03a56d3e8b9432

    constructor(private http: HttpClient) { }

    getStation(name: string): Observable<Station[]> {
        
        return this.http.get<Station[]>(this.baseURL + name);

    }


    getIrrigation(name: string): Observable<Station[]> {

        return this.http.get<Station[]>(this.baseURL + name)
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

                alert('Estado da bomba alterado!');

            },

            error => {

                console.log(JSON.stringify(error.json()));

            }

        )



    }

}

