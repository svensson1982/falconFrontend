import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';

import { GlobalService } from '../global/global.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class ChartService implements Resolve<any> {

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
     * Resolver, you can avoid the 'flashing' effect with it.
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} rstate
     * @returns {Observable<any>}
     */
    resolve(route: ActivatedRouteSnapshot, rstate: RouterStateSnapshot): Observable<any> {
        return this.http.get(environment.productURL + 'chart', this.globalService.httpOptions)
            .map(response => response)
            .catch((e) => {
                return Observable.throw(`${ e.status } ${ e.statusText }`);
            });
    }

    /**
     * When something has been changed, we emit to socket.
     * @param data
     */
    addPoints(data) {
        this.socket.emit('addPoints', data);
    }

    /**
     * When something has been changed, we receive from server emit.
     * @returns {any}
     */
    receivePoints() {
        return Observable.create(observer => {
            this.socket.on('addPoints', data => {
                observer.next(data);
            });
        });
    }


}
