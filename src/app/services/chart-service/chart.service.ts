import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

import * as io from 'socket.io-client';
import { Observable } from "rxjs/Observable";

import { environment } from "../../../environments/environment";
import { GlobalService } from "../global/global.service";

@Injectable()
export class ChartService implements Resolve<any> {

    /**
     * Constructor
     * @param {HttpClient} http
     * @param {GlobalService} globalService
     */
    constructor(private http: HttpClient,
                private globalService: GlobalService) { }

    /**
     * Resolver
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} rstate
     * @returns {Observable<any>}
     */
    resolve(route: ActivatedRouteSnapshot, rstate: RouterStateSnapshot): Observable<any> {
        return this.http.get(environment.productURL + 'chart', this.globalService.httpOptions)
            .map(response => response);
    }



}
