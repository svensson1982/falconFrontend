import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { GlobalService } from '../global/global.service';
import { PublishingService } from './publishing.service';

describe('PublishingService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                GlobalService,
                PublishingService
                ],
            imports: [
                HttpClientTestingModule
            ]
        });
    });

    it('should be created', inject([PublishingService], (service: PublishingService) => {
        expect(service).toBeTruthy();
    }));
});
