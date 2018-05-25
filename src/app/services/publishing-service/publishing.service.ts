import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';

@Injectable()
export class PublishingService implements Resolve<any> {
    httpOptions = {
        headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }
        ),
        body: ''
    };

    constructor(private http: HttpClient) { }

    /**
     * Resolver
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} rstate
     * @returns {Observable<any>}
     */
    resolve(route: ActivatedRouteSnapshot, rstate: RouterStateSnapshot): Observable<any> {
        return this.http.get(environment.productURL + 'publishing', this.httpOptions)
            .map(response => response);
    }

    /**
     * We could send put, delete, but now post because we modify json structure on frontend side
     * @param data
     * @returns {Observable<Object>}
     */
    saveJson(data) {
        return this.http.post(environment.productURL + 'publishing',data, this.httpOptions);
    }
}
