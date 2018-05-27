import { Injectable } from '@angular/core';
import { HttpHeaders } from "@angular/common/http";

@Injectable()
export class GlobalService {

    constructor() {}

    httpOptions = {
        headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
        body: ''
    };

}
