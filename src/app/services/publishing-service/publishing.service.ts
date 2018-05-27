import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';
import { GlobalService } from "../global/global.service";

@Injectable()
export class PublishingService implements Resolve<any> {

    private socket;

    /**
     * Constructor
     * @param {HttpClient} http
     * @param {GlobalService} globalService
     */
    constructor(private http: HttpClient, private globalService: GlobalService) {
        this.socket = io(environment.ws_url);
    }

    /**
     * Resolver
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} rstate
     * @returns {Observable<any>}
     */
    resolve(route: ActivatedRouteSnapshot, rstate: RouterStateSnapshot): Observable<any> {
        return this.http.get(environment.productURL + 'publishing', this.globalService.httpOptions)
            .map(response => response);
    }

    /**
     * We could send put, delete, but now post because we modify json structure on frontend side
     * @param data
     * @returns {Observable<Object>}
     */
    saveJson(data) {
        return this.http.post(environment.productURL + 'publishing', data, this.globalService.httpOptions);
    }

    addData() {
        return Observable.create(observer => {
            this.socket.on('addData', msg => {
                observer.next(msg);
            });
        });
    }
}
