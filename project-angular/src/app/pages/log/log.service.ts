import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Station } from '../garden/station1/station.model';

@Injectable()
export class LogService {

    selectedStation: Station;
    station: Station[];
    value: boolean;

    readonly baseURL = 'http://131.221.243.115:14002/stations/';

    constructor(private http: HttpClient) { }

    getStation(name: string): Observable<Station[]> {
        return this.http.get<Station[]>(this.baseURL + name);

    }

    


}

