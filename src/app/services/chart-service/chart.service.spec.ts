import {TestBed, inject} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

import {ChartService} from './chart.service';
import {GlobalService} from '../global/global.service';

describe('ChartService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ChartService,
                GlobalService
            ],
            imports: [
                HttpClientTestingModule
            ]
        });
    });

    it('should be created', inject([ChartService], (service: ChartService) => {
        expect(service).toBeTruthy();
    }));
});
