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
<<<<<<< HEAD
        return this.http.get<any>('http://131.221.243.115:8000');
=======
        return this.http.get<any>('http:131.221.243.115:8000');
>>>>>>> 7dbed8f33f7cd78fd2deca117f03a56d3e8b9432

    }


}