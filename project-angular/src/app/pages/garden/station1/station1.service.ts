import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {Station} from './station.model';

@Injectable()
export class Station1Service {

    selectedStation: Station;
    station: Station[];
    readonly baseURL = 'http://localhost:8000/stations/';

    constructor(private http: HttpClient) { }
    
    getStation(name: string): Observable<Station[]>
    {   
        return  this.http.get<Station[]>(this.baseURL+name);
        
    }


}

