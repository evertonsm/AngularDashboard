import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

export interface App {

    name: string;

}

@Injectable()
export class AppService {
    constructor (private http: HttpClient) {}

    getApp(): Observable<any> {
        return this.http.get<any>('http:192.168.180.15:8000');

    }


}